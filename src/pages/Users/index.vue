<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title"> List of Users </h4>
            <p class="category">Users in the System</p>
          </md-card-header>
          <md-card-content>
            <v-app>
              <DataTable></DataTable>
            </v-app>

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "../../components/Tables/DataTable";

export default {
  components: {
    DataTable
  }
};
</script>
