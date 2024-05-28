import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContratService } from '../_services/contrat.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  sessionId: string | null = null;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private contratService: ContratService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      if (this.sessionId) {
        this.route.url.subscribe(url => {
          const isCancel = url.some(segment => segment.path === 'cancel');
          if (this.sessionId !== null) {
            this.updatePaymentStatus(this.sessionId, !isCancel);
          }
        });
      }
    });
  }

  updatePaymentStatus(sessionId: string, success: boolean): void {
    this.contratService.updatePaymentStatus(sessionId, success).subscribe(
      response => {
        this.message = success ? 'Payment successful!' : 'Payment was cancelled.';
      },
      error => {
        console.error('Error updating payment status:', error);
        this.message = 'There was an error processing your payment. Please contact support.';
      }
    );
  }
}
