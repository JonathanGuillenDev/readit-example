<template>
  <div class="topic-details">
    <h1>{{ activeTopic.title }}</h1>
    <router-link
      :to="{ name: 'AddMessage', params: { topicId: activeTopic.id } }"
      class="addMessage"
    >Add New Message</router-link>

    <div
      v-for="message in activeTopic.messages"
      v-bind:key="message.id"
      class="topic-message bubble"
    >
      <h3 class="message-title">{{ message.title }}</h3>
      <p class="message-body">{{ message.messageText }}</p>
      <router-link
        :to="{ name: 'EditMessage', params: { topicId: activeTopic.id, messageId: message.id } }"
        tag="button"
        class="btnEditMessage"
      >Edit</router-link>
      <button class="btnDeleteMessage" @click="confirmAndDeleteMessage(message.id)">Delete</button>
    </div>

    <div v-if="!activeTopic.id">
      <p>Loading topic or topic not found...</p>
    </div>
    <div v-else-if="activeTopic.messages && activeTopic.messages.length === 0">
      <p>No messages for this topic yet. Be the first to add one!</p>
    </div>
  </div>
</template>

<script>
// REMOVE THESE IMPORTS - We are no longer using external services for data
// import topicService from "@/services/TopicService.js";
// import messageService from "@/services/MessageService.js";

import { mapState, mapActions } from 'vuex'; // Import mapState and mapActions

export default {
  name: "topic-details",
  props: {
    // Ensure that topicId is passed as a prop from your router config
    topicId: [Number, String] // Allow string for route params, convert if needed
  },
  computed: {
    // Map state properties for direct access in template and script
    ...mapState(['activeTopic', 'topics']) // Need 'topics' to find the topic by ID
  },
  methods: {
    // Map actions to be dispatched
    ...mapActions(['selectTopic', 'deleteMessage']), // 'selectTopic' is crucial for initial load

    confirmAndDeleteMessage(id) {
      if (confirm("Are you sure you want to delete this message?")) {
        // Dispatch the deleteMessage action from the store
        this.deleteMessage(id);
      }
    }
  },
  // Use a watcher to react to changes in topicId from the route
  // and also to handle the initial load.
  watch: {
    topicId: {
      immediate: true, // This makes the watcher run immediately when the component is created
      handler(newTopicId) {
        if (newTopicId && this.topics.length > 0) { // Ensure topics are loaded before searching
          const topicToSelect = this.topics.find(t => t.id == newTopicId); // Use == for loose comparison as route param might be string

          if (topicToSelect) {
            // Dispatch the selectTopic action, which will update activeTopic and its messages
            this.selectTopic(topicToSelect);
          } else {
            console.warn(`Topic with ID ${newTopicId} not found in store.`);
            // Optional: Redirect to a 404 page or home if topic not found
            // this.$router.push("/not-found");
          }
        }
      }
    },
    // Add a watcher for 'topics' state as well. This handles cases where 'topics' might
    // be populated slightly after 'topicId' is available (e.g., if initialData load is delayed, though unlikely for static JSON)
    topics: {
      immediate: true,
      handler(newTopics) {
        if (newTopics.length > 0 && this.topicId) {
          const topicToSelect = newTopics.find(t => t.id == this.topicId);
          // Only select if it's a different topic than currently active to avoid unnecessary re-renders
          if (topicToSelect && this.activeTopic.id !== topicToSelect.id) {
             this.selectTopic(topicToSelect);
          }
        }
      }
    }
  }
};
</script>

<style>
/* Your existing styles (no changes needed here) */
/** page structure **/
.topic-details {
  padding: 20px 20px;
  margin: 0 auto;
  max-width: 600px;
}

/** ios1-ios6 bubbles **/
.topic-details .bubble {
  box-sizing: border-box;
  width: auto;
  position: relative;
  clear: both;

  background: #95c2fd;
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.15, #bee2ff),
    color-stop(1, #95c2fd)
  );
  background-image: -webkit-linear-gradient(bottom, #bee2ff 15%, #95c2fd 100%);
  background-image: -moz-linear-gradient(bottom, #bee2ff 15%, #95c2fd 100%);
  background-image: -ms-linear-gradient(bottom, #bee2ff 15%, #95c2fd 100%);
  background-image: -o-linear-gradient(bottom, #bee2ff 15%, #95c2fd 100%);
  background-image: linear-gradient(to top, #bee2ff 15%, #95c2fd 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#95c2fd', endColorstr='#bee2ff');

  border: solid 1px rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;

  -webkit-box-shadow: inset 0 8px 5px rgba(255, 255, 255, 0.65),
    0 1px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: inset 0 8px 5px rgba(255, 255, 255, 0.65),
    0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 8px 5px rgba(255, 255, 255, 0.65),
    0 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  padding: 6px 20px;
  color: #000;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
  word-wrap: break-word;
}

.addMessage {
  display: block;
  padding: 0 0 10px 10px;
}
a.addMessage:link,
a.addMessage:visited {
  color: blue;
  text-decoration: none;
}
a.addMessage:hover {
  text-decoration: underline;
}
</style>