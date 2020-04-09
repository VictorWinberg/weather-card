import { LitElement, html, customElement, property, CSSResult, TemplateResult, css, PropertyValues } from 'lit-element';
import { HomeAssistant, hasConfigOrEntityChanged, getLovelace } from 'custom-card-helpers';

import { WeatherCardConfig } from './types';
import { CARD_VERSION } from './const';
import { HassEntity } from 'home-assistant-js-websocket';

/* eslint no-console: 0 */
console.info(
  `%c  WEATHER-CARD  \n%c  Version ${CARD_VERSION} `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

@customElement('weather-card')
export class WeatherCard extends LitElement {
  public static getStubConfig(): object {
    return {};
  }

  // TODO Add any properities that should cause your element to re-render here
  @property() public hass?: HomeAssistant;
  @property() private _config?: WeatherCardConfig;

  public setConfig(config: WeatherCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config.entity) {
      throw new Error('Please define a weather entity');
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this._config = {
      name: 'Weather Card',
      title: 'Temperature',
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected render(): TemplateResult | void {
    if (!this._config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="warning">
            Entity not available: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    const canvas = document.createElement('canvas');
    const W = document.body.clientWidth;
    const H = document.body.clientHeight;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.setCanvas(ctx, this._config.test_state || stateObj.state, W, H);
    }

    return html`
      <ha-card .header=${this._config.name}>
        ${canvas}
        <div class="card-content">
          <div class="title">
            ${this._config.title}
          </div>
          <div class="temp">
            ${stateObj.attributes.temperature}°C
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles(): CSSResult {
    return css`
      .warning {
        display: block;
        color: black;
        background-color: #fce588;
        padding: 8px;
      }
      canvas {
        display: flex;
        position: fixed;
        pointer-events: none;
        z-index: 1;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20em;
        opacity: 0.4;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    `;
  }

  setCanvas(ctx: CanvasRenderingContext2D, state: string, W: number, H: number): void {
    switch (state) {
      // case 'clear-night':
      // case 'cloudy':
      // case 'fog':
      // case 'hail':
      // case 'lightning':
      // case 'lightning-rainy':
      // case 'partlycloudy':
      // case 'pouring':
      case 'rainy':
        this.drawInterval(ctx, W, H, 33, [this.setRainyCanvas(ctx, W, H)]);
        break;
      case 'snowy':
        this.drawInterval(ctx, W, H, 33, [this.setSnowyCanvas(ctx, W, H)]);
        break;
      case 'snowy-rainy':
        this.drawInterval(ctx, W, H, 33, [this.setRainyCanvas(ctx, W, H), this.setSnowyCanvas(ctx, W, H)]);
        break;
      case 'sunny':
        this.drawInterval(ctx, W, H, 100, [this.setSunnyCanvas(ctx, W, H)]);
        break;
      // case 'windy':
      // case 'windy-variant':
      // case 'exceptional':

      default:
        this.setDefaultCanvas(ctx, state, W, H);
        break;
    }
  }

  drawInterval(ctx: CanvasRenderingContext2D, W: number, H: number, ms: number, draws: (() => void)[]): void {
    setInterval(() => {
      ctx.clearRect(0, 0, W, H);
      draws.forEach(draw => draw());
    }, ms);
  }

  setSnowyCanvas(ctx: CanvasRenderingContext2D, W: number, H: number): () => void {
    //snowflake particles
    const mp = 100; //max particles
    const particles: {
      x: number;
      y: number;
      r: number;
      d: number;
    }[] = [];

    for (let i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        r: Math.random() * 8 + 1, //radius
        d: Math.random() * mp, //density
      });
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    let angle = 0;
    function update(): void {
      angle += 0.01;
      for (let i = 0; i < mp; i++) {
        const p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) {
            //66.67% of the flakes
            particles[i] = {
              x: Math.random() * W,
              y: -10,
              r: p.r,
              d: p.d,
            };
          } else {
            //If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              //Enter from the left
              particles[i] = {
                x: -5,
                y: Math.random() * H,
                r: p.r,
                d: p.d,
              };
            } else {
              //Enter from the right
              particles[i] = {
                x: W + 5,
                y: Math.random() * H,
                r: p.r,
                d: p.d,
              };
            }
          }
        }
      }
    }

    //Lets draw the flakes
    function draw(): void {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      for (let i = 0; i < mp; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
    }

    return draw;
  }

  setSunnyCanvas(ctx: CanvasRenderingContext2D, W: number, H: number): () => void {
    let offset = H / 2;
    let direction = 4;

    function draw(): void {
      const grd = ctx.createRadialGradient(W / 2, 0, H / 2 - 200, W / 2, 0, offset);
      grd.addColorStop(0, 'rgba(255,255,0,0.8)');
      grd.addColorStop(1, 'rgba(255,165,0,0.1)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
      offset += direction;
      if (offset < H / 2 - 100 || offset > H / 2 + 100) {
        direction *= -1;
        offset += direction;
      }
    }

    return draw;
  }

  setRainyCanvas(ctx: CanvasRenderingContext2D, W: number, H: number): () => void {
    ctx.strokeStyle = 'rgba(96,144,216,0.7)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    const init: { x: number; y: number; l: number; xs: number; ys: number }[] = [];
    const maxParts = 200;
    for (let a = 0; a < maxParts; a++) {
      init.push({
        x: Math.random() * W,
        y: Math.random() * H,
        l: Math.random() * 1,
        xs: -1 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10,
      });
    }

    const particles: { x: number; y: number; l: number; xs: number; ys: number }[] = [];
    for (let b = 0; b < maxParts; b++) {
      particles[b] = init[b];
    }

    function move(): void {
      for (let b = 0; b < particles.length; b++) {
        const p = particles[b];
        p.x += p.xs;
        p.y += p.ys;
        if (p.x > W || p.y > H) {
          p.x = Math.random() * W;
          p.y = -10;
        }
      }
    }

    function draw(): void {
      for (let c = 0; c < particles.length; c++) {
        const p = particles[c];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
      }
      move();
    }

    return draw;
  }

  setDefaultCanvas(ctx: CanvasRenderingContext2D, state: string, W: number, H: number): () => void {
    function draw(): void {
      ctx.fillStyle = 'gray';
      ctx.font = '30em Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(state, W / 2, H / 2);
    }

    return draw;
  }
}
