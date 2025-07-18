<template>
  <form @submit.prevent="saveTopic"> <div class="field">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="topic.title" /> </div>
    <div class="actions">
      <button type="submit">Save Document</button>
      <button type="button" @click="cancel">Cancel</button> </div>
  </form>
</template>

<script>
// REMOVE THIS IMPORT - No longer using external service
// import topicService from "@/services/TopicService.js";

import { mapActions } from 'vuex'; // Import mapActions

export default {
  name: "create-topic",
  data() {
    return {
      topic: {
        // ID generation should ideally be handled by the store
        // or a backend to ensure uniqueness. For static JSON, Math.random() is okay,
        // but be aware of potential (though rare) collisions.
        id: this.generateUniqueId(), // Use a method to generate ID
        title: ""
      }
    };
  },
  methods: {
    // Map the action to add a new topic
    ...mapActions(['addTopic']), // You'll need to create this action and mutation in your store

    generateUniqueId() {
      // A simple method for unique IDs in a static context.
      // In a real app, IDs would come from the database.
      return Date.now() + Math.floor(Math.random() * 1000);
    },
    saveTopic() {
      if (!this.topic.title.trim()) { // Basic validation
        alert('Topic title cannot be empty.');
        return;
      }

      // Dispatch the Vuex action to add the new topic to the store
      this.addTopic(this.topic)
        .then(() => {
          // After successful addition, redirect to the home page or the new topic's page
          this.$router.push("/");
          // Optionally, reset the form for another entry (if not redirecting)
          // this.topic.title = "";
          // this.topic.id = this.generateUniqueId();
        })
        .catch(error => {
          console.error("Error adding topic:", error);
          // Handle error, e.g., show an alert
        });
    },
    cancel() {
      // Go back to the previous page (Home)
      this.$router.back();
    }
  }
};
</script>

<style>
/* Your existing styles (no changes needed here, just adding them for completeness) */
form {
  padding: 20px;
  font-size: 16px;
}
form * {
  box-sizing: border-box;
  line-height: 1.5;
}
.field {
  display: flex;
  flex-direction: column;
}
.field label {
  margin: 4px 0;
  font-weight: bold;
}
.field input,
.field textarea {
  padding: 8px;
  font-size: 18px;
}
.field textarea {
  height: 300px;
}
.actions {
  text-align: right;
  padding: 10px 0;
}

/* Styles for buttons, consistent with other forms */
.actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.actions button[type="submit"] {
  background-color: #28a745; /* Green for save */
  color: white;
}

.actions button[type="submit"]:hover {
  background-color: #218838;
}

.actions button[type="button"] { /* For the Cancel button */
  background-color: #6c757d; /* Gray */
  color: white;
}

.actions button[type="button"]:hover {
  background-color: #5a6268;
}
</style>