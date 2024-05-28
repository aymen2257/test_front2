import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ContratService } from '../_services/contrat.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent implements OnInit {

  user: any;
  contrats: any;
  expiredContrats: any;
  id: any;
  today: Date = new Date();
  isSidebarCollapsed: boolean=false;

  constructor(private token: TokenStorageService, private contratService: ContratService) { }

  ngOnInit(): void {
    this.user = this.token.getUser();
    this.id = this.user.id;
    this.getContrats(this.user.id);
    this.checkExpiredContracts(this.user.id);
  }

  getContrats(id: any) {
    this.contratService.getUserContrats(id).subscribe(
      data => {
        this.contrats = data;
      },
      err => {
        console.error("Error loading contracts:", err);
      }
    );
  }

  async payForContrat(contratId: number) {
    this.contratService.createPaymentSession(contratId).subscribe(async (response: any) => {
      const sessionId = response.sessionId;
      if (!sessionId) {
        console.error("Failed to create session:", response);
        alert("Failed to create payment session. Please try again.");
        return;
      }

      const stripe = await loadStripe('pk_test_51PG9CNLvE4Q0JCmFhoDb5P5rbPlGKjJBbvEedLa8STPVcf8svw6QzQqh5q33ao2tj0RZCqY1kJnZZrNhvPyWJ2AR00gLcrr9Qp');
      if (stripe) {
        stripe.redirectToCheckout({ sessionId: sessionId });
      }
    }, error => {
      console.error("HTTP Error:", error);
      alert("Failed to communicate with the server. Please try again.");
    });
  }

  checkExpiredContracts(userId: any) {
    this.contratService.getExpiredContracts(userId).subscribe(
      data => {
        this.expiredContrats = data;
        if (this.expiredContrats.length > 0) {
          alert("You have expired contracts. Please renew them.");
        }
      },
      err => {
        console.error("Error loading expired contracts:", err);
      }
    );
  }

  async renewContract(contratId: number) {
    this.contratService.renewContract(contratId).subscribe(async (response: any) => {
      const sessionId = response.sessionId;
      if (!sessionId) {
        console.error("Failed to create session:", response);
        alert("Failed to create renewal payment session. Please try again.");
        return;
      }

      const stripe = await loadStripe('pk_test_51PG9CNLvE4Q0JCmFhoDb5P5rbPlGKjJBbvEedLa8STPVcf8svw6QzQqh5q33ao2tj0RZCqY1kJnZZrNhvPyWJ2AR00gLcrr9Qp');
      if (stripe) {
        stripe.redirectToCheckout({ sessionId: sessionId });
      }
    }, error => {
      console.error("HTTP Error:", error);
      alert("Failed to communicate with the server. Please try again.");
    });
  }

  isExpired(dateFinEffet: Date): boolean {
    return new Date(dateFinEffet) < this.today;
  }

  needsRenewal(contrat: any): boolean {
    return this.isExpired(contrat.date_fin_effet) && !contrat.renewed;
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
