/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: "#app",
    data: {
      leads: [],
      time_format: "12/25/17",
      url: "https://www.google.com/",
      search: "",
      sortKey: ""
    },
    mounted: function() {
      $.get("/api/v1/leads.json").success(
        function(response) {
          console.log(this);
          this.leads = response;
        }.bind(this)
      );
    },
    methods: {
      moment: function(date) {
        return moment(date);
      },
      showEvents: function(lead) {
        document.getElementById(lead.id).classList.add("show");
      },
      sortLeads: function(key) {
        const leads =
          this.sortKey === key
            ? this.leads.reverse()
            : this.leads.sort((a, b) => {
                if (a[key] > b[key]) {
                  return 1;
                } else {
                  return -1;
                }
              });

        this.leads = leads;
        this.sortKey = key;
      }
    },
    computed: {
      filteredLeads() {
        const search = this.search.toLowerCase();

        if (!search) {
          return this.leads;
        }

        return this.leads.filter(lead => {
          return (
            lead.email.toLowerCase().includes(search) ||
            lead.first_name.toLowerCase().includes(search) ||
            lead.last_name.toLowerCase().includes(search)
          );
        });
      }
    }
  });
});
