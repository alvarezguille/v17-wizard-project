import { customElement, html, LitElement, unsafeCSS, property } from 'lit-element';

import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-form-layout/vaadin-form-item';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-text-field/vaadin-text-field';

import { EndpointError } from '@vaadin/flow-frontend/Connect';

// import the remote endpoint
import * as PersonEndpoint from '../../generated/PersonEndpoint';

import { Binder, field } from '@vaadin/form';

// utilities to import style modules
import { CSSModule } from '@vaadin/flow-frontend/css-utils';

import styles from './form-view.css';
import PersonModel from '../../generated/com/example/application/data/entity/PersonModel';

@customElement('form-view')
export class FormViewElement extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  @property({ type: Boolean })
  private showNotification: boolean = false;

  @property({ type: String })
  private errorMessage: string = '';

  private binder = new Binder(this, PersonModel);

  render() {
    return html`
      <vaadin-vertical-layout id="wrapper" theme="padding">
        <h1>Form</h1>
        <vaadin-form-layout>
          <vaadin-form-item>
            <label slot="label">First name</label>
            <vaadin-text-field
              id="firstName"
              class="full-width"
              ...="${field(this.binder.model.firstName)}"
            ></vaadin-text-field>
          </vaadin-form-item>
          <vaadin-form-item>
            <label slot="label">Last name</label>
            <vaadin-text-field
              class="full-width"
              id="lastName"
              ...="${field(this.binder.model.lastName)}"
            ></vaadin-text-field>
          </vaadin-form-item>
          <vaadin-form-item colspan="2">
            <label slot="label">Email</label>
            <vaadin-text-field
              class="full-width"
              id="email"
              ...="${field(this.binder.model.email)}"
            ></vaadin-text-field>
          </vaadin-form-item>
        </vaadin-form-layout>
        <vaadin-horizontal-layout id="button-layout" theme="spacing">
          <vaadin-button theme="tertiary" @click="${this.clearForm}">
            Cancel
          </vaadin-button>
          <vaadin-button theme="primary" @click="${this.save}">
            Save
          </vaadin-button>
        </vaadin-horizontal-layout>
        <vaadin-notification
          duration="5000"
          id="notification"
          ?opened="${this.showNotification}"
          .textContent="${this.errorMessage}"
        >
        </vaadin-notification>
      </vaadin-vertical-layout>
    `;
  }

  private async save() {
    try {
      await this.binder.submitTo(PersonEndpoint.update);
    } catch (error) {
      if (error instanceof EndpointError) {
        this.errorMessage = 'Server error. ' + error.message;
        this.showNotification = true;
      } else {
        throw error;
      }
    }
  }

  private clearForm() {
    this.binder.clear();
  }
}
