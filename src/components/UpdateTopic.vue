<template>
  <form v-on:submit.prevent="updateTopic"> <div class="field">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="title" /> </div>
    <div class="actions">
      <button type="submit">Save Document</button>
      <button type="button" @click="cancel">Cancel</button> </div>
  </form>
</template>

<script>
// REMOVE THIS IMPORT - No longer using external service
// import topicService from "@/services/TopicService.js";

import { mapState, mapActions } from 'vuex'; // Import mapState and mapActions

export default {
  // Your name here is 'create-topic', but it's handling updates.
  // Consider renaming the component file and this property to 'edit-topic'
  // or 'update-topic' for clarity if it's strictly for editing.
  name: "edit-topic", // Renamed for clarity based on functionality
  props: {
    // router/index.js currently uses ':id' for EditTopic.
    // Ensure this prop name matches the route param name.
    id: [Number, String] // Changed from 'topicID' to 'id' to match router param
  },
  data() {
    return {
      title: ""
    };
  },
  computed: {
    ...mapState(['topics']) // We need access to the topics array to find the topic by ID
  },
  methods: {
    ...mapActions(['updateTheTopic']), // Map the new updateTheTopic action

    updateTopic() {
      const updatedTopic = { id: this.id, title: this.title }; // Use this.id (from prop)

      // Dispatch the Vuex action to update the topic in the store
      this.updateTheTopic(updatedTopic)
        .then(() => {
          // After successful update in the store, redirect
          this.$router.push({ name: 'Messages', params: { topicId: this.id } }); // Redirect to topic details
          // Or redirect to Home: this.$router.push("/");
        })
        .catch(error => {
          console.error("Error updating topic:", error);
          // Handle error, e.g., show a user message
        });
    },
    cancel() {
      // Go back to the previous page or home
      this.$router.back();
    }
  },
  watch: {
    // Watch the 'id' prop to load the topic when it changes or on initial creation
    id: {
      immediate: true, // This makes the watcher run immediately when the component is created
      handler(newId) {
        if (newId && this.topics.length > 0) { // Ensure topics are loaded before searching
          const topicToEdit = this.topics.find(t => t.id == newId); // Find the topic by its ID

          if (topicToEdit) {
            this.title = topicToEdit.title; // Populate the form field
          } else {
            console.warn(`Topic with ID ${newId} not found in store for editing.`);
            this.$router.push("/not-found"); // Redirect if topic not found
          }
        }
      }
    },
    // Also watch the 'topics' state as a fallback, in case topics array loads after the component
    topics: {
      immediate: true,
      handler(newTopics) {
        if (newTopics.length > 0 && this.id && !this.title) { // Only try to set if title is not already set
          const topicToEdit = newTopics.find(t => t.id == this.id);
          if (topicToEdit) {
            this.title = topicToEdit.title;
          }
        }
      }
    }
  }
};
</script>

<style>
/* Add some basic styles for the form */
form {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.field {
  margin-bottom: 15px;
}

.field label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.field input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  box-sizing: border-box; /* Ensures padding doesn't increase width */
}

.actions {
  text-align: right;
}

.actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.actions button[type="submit"] {
  background-color: #4CAF50; /* Green */
  color: white;
}

.actions button[type="submit"]:hover {
  background-color: #45a049;
}

.actions button[type="button"] { /* For the Cancel button */
  background-color: #f44336; /* Red */
  color: white;
}

.actions button[type="button"]:hover {
  background-color: #da190b;
}
</style>