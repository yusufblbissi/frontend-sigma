<template>
  <div class="container mt-4">
    <h2>Submit Loan Application</h2>
    <form @submit.prevent="submitLoan" class="mb-4">
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="name" v-model="loanData.name" required>
      </div>
      <div class="mb-3">
        <label for="loanAmount" class="form-label">Loan Amount</label>
        <input type="number" class="form-control" id="loanAmount" v-model="loanData.loanAmount" required>
      </div>
      <div class="mb-3">
        <label for="loanTerm" class="form-label">Loan Term (in months)</label>
        <input type="number" class="form-control" id="loanTerm" v-model="loanData.loanTerm" required>
      </div>
      <div class="mb-3">
        <label for="currency" class="form-label">Currency</label>
        <select class="form-select" v-model="loanData.currency" required>
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="phoneNumber" class="form-label">Phone Number</label>
        <input type="tel" class="form-control" id="phoneNumber" v-model="loanData.phoneNumber" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="loanData.email" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <div v-if="message" :class="messageClass" class="alert mt-3">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { loanService } from "@/services/loanService"; 

export default {
  data() {
    return {
      loanData: {
        name: '',
        loanAmount: null,
        loanTerm: null,
        currency: '',
        phoneNumber: '',
        email: '',
      },
      currencies: [], 
      message: '',     
      messageClass: '', 
    };
  },
  async created() {
    try {
      this.currencies = await loanService.getListOfCurrencies();
      if (this.currencies.length > 0) {
        this.loanData.currency = this.currencies[0];  
      }
    } catch (error) {
      console.error('Error loading currencies:', error);
      this.message = 'Failed to load currencies. Please try again.';
      this.messageClass = 'alert-danger'; 
    }
  },
  methods: {
    async submitLoan() {
      try {
        await loanService.submitLoan(this.loanData);
        this.message = 'Loan application submitted successfully!';
        this.messageClass = 'alert-success'; 

        this.loanData = {
          name: '',
          loanAmount: null,
          loanTerm: null,
          currency: this.currencies[0] || '',  
          phoneNumber: '',
          email: '',
        };
      } catch (error) {
        console.error('Error submitting loan application:', error);
        this.message = 'There was an error submitting the loan application. Please try again.';
        this.messageClass = 'alert-danger';
      }
    },
  },
};
</script>
