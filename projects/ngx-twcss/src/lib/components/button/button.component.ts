import { Component, Directive, Input, OnInit, inject } from '@angular/core';
import { resolveClassName, toClassName } from '../../core/helpers/config.helper';
import { ButtonConfig, ButtonConfigKey, ButtonSize, ButtonVariant, IconSize, IconSizeConfig } from './button.config';
import { ConfigService } from '../../core/services/config.service';

/** Button element */
@Component({
  selector: 'tw-button',
  standalone: true,
  template: '<button type="button" [className]="style"><ng-content></ng-content></button>'
})
export class Button implements OnInit {
  private _config = inject(ConfigService<ButtonConfig>);

  @Input() style!: string;
  @Input() className!: string;
  @Input() size: ButtonSize = 'md';
  @Input() variant: ButtonVariant = 'primary';
  @Input() fab: boolean = false;

  ngOnInit(): void {
    this.initConfig();
  }

  initConfig(): void {
    if (this.style) return;

    if (this.fab === true) {
      this.className = resolveClassName('shadow-md shadow-black/30', this.className);
    }
    this._config.set(ButtonConfigKey, ButtonConfig)
      .get(ButtonConfigKey).subscribe((cfg) => {
        let style = toClassName({ variant: cfg[this.variant], size: cfg.size[this.size] });
        this.style = resolveClassName(style, this.className);
      });
  }
}

/** Icon button */
@Directive({
  selector: '[tw-icon]',
  standalone: true,
})
export class Icon implements OnInit {
  @Input() size: IconSize = 'md';

  constructor(public el: Button) { }

  ngOnInit(): void {
    let base = toClassName(IconSizeConfig[this.size]!);
    this.el.className = resolveClassName(base, this.el.className);
    this.el.initConfig();
  }
}
