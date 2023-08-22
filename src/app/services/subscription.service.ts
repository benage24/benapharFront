import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  // Array to store subscriptions
  private subscriptions: Subscription[] = [];

  constructor() { }


   /**
   * Adds a subscription to the list of subscriptions.
   * @ param subscription The subscription to be added.
   */
   add(subscription: Subscription): void {
    this.subscriptions.push(subscription);
   
    
  }

  /**
   * Unsubscribes from all subscriptions in the list when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  /**
   * Unsubscribes from all subscriptions in the list.
   * This method is private and used internally by ngOnDestroy.
   */
  private unsubscribeAll(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
