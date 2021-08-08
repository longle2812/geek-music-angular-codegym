import {Injectable} from '@angular/core';

declare var $: any;
declare var toastr: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
  }

  showSuccessMessage(message) {
    $(() => {
      toastr.options.closeButton = true;
      toastr.options.closeMethod = 'fadeOut';
      toastr.options.closeDuration = 300;
      toastr.options.closeEasing = 'swing';
      toastr.success(message);
    });
  }

  showErrorMessage(message) {
    $(() => {
      toastr.options.closeButton = true;
      toastr.options.closeMethod = 'fadeOut';
      toastr.options.closeDuration = 300;
      toastr.options.closeEasing = 'swing';
      toastr.error(message);
    });
  }

  showLogoutMessage(msg) {
    $(() => {
      toastr.options.closeButton = true;
      toastr.options.closeMethod = 'fadeOut';
      toastr.options.closeDuration = 300;
      toastr.options.closeEasing = 'swing';
      toastr.info(msg);
    });
  }
}
