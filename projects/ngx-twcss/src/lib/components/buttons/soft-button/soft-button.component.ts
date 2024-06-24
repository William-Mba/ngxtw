import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent, SizeVariant } from '../../base.component';
import { SoftButtonConfig, SoftButtonConfigKey } from './soft-button.config';

/**Soft button element
 * @package ngx-twcss
*/
@Component({
  selector: 'tw-soft-button',
  standalone: true,
  templateUrl: './soft-button.component.html',
})
export class SoftButton extends BaseComponent<SoftButtonConfig> implements OnInit {
  @Input() override size: SizeVariant = 'md';
  @Input() override className: string = '';

  ngOnInit(): void {
    this.initConfig(SoftButtonConfigKey, SoftButtonConfig);
  }
}
