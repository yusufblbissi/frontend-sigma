<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Loan Application Details</h2>
    
    <div v-if="loanDetails" class="card shadow-sm">
      <div class="card-body">
        <h4 class="card-title mb-3">Loan Information</h4>
        
        <div class="row mb-3">
          <div class="col-md-6">
            <p><strong>Name:</strong> {{ loanDetails.name }}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Phone Number:</strong> {{ loanDetails.phoneNumber }}</p>
          </div>
        </div>
        
        <div class="row mb-3">
          <div class="col-md-6">
            <p><strong>Loan Amount:</strong> {{ loanDetails.loanAmount }} {{ loanDetails.currency }}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Email:</strong> {{ loanDetails.email }}</p>
          </div>
        </div>
        
        <div class="row mb-3">
          <div class="col-md-6">
            <p><strong>Loan Term:</strong> {{ loanDetails.loanTerm }} months</p>
          </div>
          <div class="col-md-6">
            <p><strong>Converted Amount (USD):</strong> {{ loanDetails.convertedAmountUSD }} USD</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center mt-4">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p class="mt-2">Loading details...</p>
    </div>
  </div>
</template>

<script>
import { loanService } from "../services/loanService";

export default {
  data() {
    return {
      loanDetails: null,
    };
  },
  async created() {
    const loanId = this.$route.params.loanId;

    try {
      const response = await loanService.getLoanById(loanId);
      this.loanDetails = response.data.loanData; 
    } catch (error) {
      console.error('Error fetching loan details:', error);
      alert("Failed to fetch loan details.");
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.card {
  border-radius: 10px;
}

.card-title {
  font-weight: bold;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.25rem;
}
</style>
