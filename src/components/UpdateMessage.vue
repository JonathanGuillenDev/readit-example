<template>
  <form @submit.prevent="updateMessage"> <div class="field">
      <label for="title">Title</label>
      <input id="title" type="text" v-model="title" /> </div>
    <div class="field">
      <label for="messageText">Message</label>
      <textarea id="messageText" v-model="messageText"></textarea> </div>
    <div class="actions">
      <button type="submit">Update Message</button>
      <button type="button" @click="cancel">Cancel</button> </div>
  </form>
</template>

<script>
// REMOVE THIS IMPORT - No longer using external service
// import messageService from "../services/MessageService";

import { mapState, mapActions } from 'vuex'; // Import mapState and mapActions

export default {
  // Renamed for clarity, reflecting its purpose as an edit component
  name: "edit-message",
  props: {
    // These props are passed from the router based on your /:topicId/edit-message/:messageId route
    topicId: [Number, String],
    messageId: [Number, String]
  },
  data() {
    return {
      title: "",
      messageText: ""
    };
  },
  computed: {
    // Need access to allMessages to find the specific message to edit
    ...mapState(['allMessages'])
  },
  methods: {
    // Map the action to update a message
    ...mapActions(['updateTheMessage']), // You'll need to create this action and mutation in your store

    updateMessage() {
      const updatedMessage = {
        id: this.messageId,
        topicId: this.topicId,
        title: this.title,
        messageText: this.messageText
      };

      // Dispatch the Vuex action to update the message in the store
      this.updateTheMessage(updatedMessage)
        .then(() => {
          // After successful update, redirect to the messages for this topic
          this.$router.push({ name: "Messages", params: { topicId: this.topicId } });
        })
        .catch(error => {
          console.error("Error updating message:", error);
          // Handle error, e.g., show an alert
        });
    },
    cancel() {
      // Go back to the previous page (topic details)
      this.$router.back();
    }
  },
  watch: {
    // Watch 'messageId' to load the message details when the component is created or messageId changes
    messageId: {
      immediate: true, // This makes the watcher run immediately when the component is created
      handler(newMessageId) {
        if (newMessageId && this.allMessages.length > 0) { // Ensure allMessages are loaded
          const messageToEdit = this.allMessages.find(msg => msg.id == newMessageId);

          if (messageToEdit) {
            this.title = messageToEdit.title;
            this.messageText = messageToEdit.messageText;
          } else {
            console.warn(`Message with ID ${newMessageId} not found in store.`);
            this.$router.push("/not-found"); // Redirect if message not found
          }
        }
      }
    },
    // Watch 'allMessages' as a fallback, in case the messages array loads after the component
    allMessages: {
      immediate: true,
      handler(newMessages) {
        if (newMessages.length > 0 && this.messageId && (!this.title || !this.messageText)) {
          const messageToEdit = newMessages.find(msg => msg.id == this.messageId);
          if (messageToEdit) {
            this.title = messageToEdit.title;
            this.messageText = messageToEdit.messageText;
          }
        }
      }
    }
  }
};
</script>

<style>
/* Add some basic styles for the form, similar to UpdateTopic.vue */
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

.field input[type="text"],
.field textarea { /* Added textarea style */
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
}

.field textarea {
  min-height: 100px; /* Give textarea a default height */
  resize: vertical; /* Allow vertical resizing */
}

.actions {
  text-align: right;
  margin-top: 20px;
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
  background-color: #007bff; /* Blue for update */
  color: white;
}

.actions button[type="submit"]:hover {
  background-color: #0056b3;
}

.actions button[type="button"] { /* For the Cancel button */
  background-color: #6c757d; /* Gray */
  color: white;
}

.actions button[type="button"]:hover {
  background-color: #5a6268;
}
</style>