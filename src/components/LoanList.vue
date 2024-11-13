<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center bg-light p-2">
      <h2>Submitted Loan Applications</h2>
      <button class="btn btn-primary" @click="goToAddLoanForm">Add New Loan</button>
    </div>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Loan Amount</th>
            <th scope="col">Loan Amount USD</th>
            <th scope="col">Term (Months)</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in loans" :key="loan.id">
            <td>{{ loan.name }}</td>
            <td>{{ loan.loanAmount }} {{ loan.currency }}</td>
            <td>{{ loan.convertedInUSD }} USD</td>
            <td>{{ loan.loanTerm }}</td>
            <td>{{ loan.email }}</td>
            <td>{{ loan.phoneNumber }}</td>
            <td>
              <button class="btn btn-info " @click="viewLoanDetails(loan._id)">Details</button>
              <button class="btn btn-danger" @click="deleteLoan(loan._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-end mt-4">
      <button class="btn btn-secondary ms-2" :disabled="currentPage === 1" @click="fetchLoans(currentPage - 1)">
        Previous
      </button>
      <span class="mx-3">{{ currentPage }} / {{ totalPages }}</span>
      <button class="btn btn-secondary ms-2" :disabled="currentPage === totalPages"
        @click="fetchLoans(currentPage + 1)">
        Next
      </button>
    </div>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loans: [],
      currentPage: 1,
      totalPages: 1,
      totalLoans: 0,
      limit: 10,
      loanToUpdate: {
        _id: '',
        name: '',
        loanAmount: '',
        loanTerm: '',
        email: '',
        phoneNumber: ''
      },
      showModal: false,  // New flag to control modal visibility
    };
  },
  mounted() {
    this.fetchLoans(this.currentPage);
  },
  methods: {
    fetchLoans(page) {
      axios.get(`http://localhost:5000/api/loans?page=${page}&limit=${this.limit}`)
        .then((response) => {
          this.loans = response.data.loansData;
          this.totalLoans = response.data.total;
          this.totalPages = response.data.pages;
          this.currentPage = response.data.currentPage;
        })
        .catch((error) => {
          console.error('Error fetching loan data:', error);
          alert('There was an error fetching the loan data.');
        });
    },
    goToAddLoanForm() {
      this.$router.push('/loan-form');
    },
    viewLoanDetails(loanId) {
      this.$router.push(`/loan-details/${loanId}`);
    },
    closeModal() {
      this.showModal = false;  
    },
    deleteLoan(loanId) {
      if (confirm('Are you sure you want to delete this loan application?')) {
        axios.delete(`http://localhost:5000/api/loans/${loanId}`)
          .then(() => {
            this.fetchLoans(this.currentPage);
            alert('Loan application deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting loan:', error);
            alert('There was an error deleting the loan application.');
          });
      }
    }
  }
};
</script>



<style scoped>
.btn-secondary {
  min-width: 100px;
}

.me-2 {
  margin-right: 10px;
}

.ms-2 {
  margin-left: 10px;
}

span {
  font-size: 1.1rem;
  font-weight: bold;
}

.table-wrapper {
  max-height: 33rem;
  overflow-y: auto;
}

.table {
  table-layout: fixed;
  width: 100%;
}

.table th,
.table td {
  word-wrap: break-word;
}
</style>
