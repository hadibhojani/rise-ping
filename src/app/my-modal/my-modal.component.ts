import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.scss'],
})
export class MyModalComponent {
  myForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  submit() {
    if (this.myForm.valid) {
      this.modalController.dismiss(this.myForm.value);
    }
  }
}
