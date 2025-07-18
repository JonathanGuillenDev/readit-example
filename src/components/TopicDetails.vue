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
import { mapState, mapActions } from 'vuex';

export default {
  name: "topic-details", // This component's name
  props: {
    topicId: [Number, String] // Ensure this prop is being received
  },
  computed: {
    ...mapState(['activeTopic', 'topics']) // activeTopic and allTopics from store
  },
  methods: {
    ...mapActions(['selectTopic', 'deleteMessage']), // Actions to interact with store

    confirmAndDeleteMessage(id) {
      console.log('Attempting to delete message with ID:', id); // Log for delete action
      if (confirm("Are you sure you want to delete this message?")) {
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
        console.log('--- Watcher: topicId handler initiated ---');
        console.log('1. Current topicId prop:', newTopicId);
        console.log('2. Current state.topics (from mapState):', this.topics); // Crucial: Is this populated?

        // Check if newTopicId is valid AND topics array is populated
        if (newTopicId && this.topics && this.topics.length > 0) {
          const topicToSelect = this.topics.find(t => t.id == newTopicId); // Use == for loose comparison as route param might be string
          console.log('3. Found topic to select (after find):', topicToSelect);

          if (topicToSelect) {
            console.log('4. Dispatching selectTopic action with:', topicToSelect);
            this.selectTopic(topicToSelect); // Dispatch action to set activeTopic
          } else {
            console.warn(`5. Topic with ID ${newTopicId} NOT found in store's topics array.`);
            // This is where your "Topic not found" message logic originates
          }
        } else if (newTopicId && (!this.topics || this.topics.length === 0)) {
          console.warn(`6. topicId (${newTopicId}) is present, but state.topics is empty or not yet loaded.`);
          console.warn('   This indicates either an empty store or a timing issue.');
        } else {
          console.log('7. topicId is null or undefined on initial load, or topics is empty and topicId is null.');
        }
        console.log('--- Watcher: topicId handler finished ---');
      }
    },
    // Add a watcher for 'topics' state as well. This handles cases where 'topics' might
    // be populated slightly after 'topicId' is available (e.g., if initialData load is delayed, though unlikely for static JSON)
    topics: {
      immediate: true,
      handler(newTopics) {
        console.log('--- Watcher: topics handler initiated ---');
        console.log('8. topics array updated:', newTopics); // Crucial: What does this array contain?
        console.log('9. Current topicId prop:', this.topicId);

        if (newTopics && newTopics.length > 0 && this.topicId) {
          const topicToSelect = newTopics.find(t => t.id == this.topicId);
          console.log('10. Found topic to select (from topics watcher):', topicToSelect);

          // Only select if it's a different topic than currently active to avoid unnecessary re-renders
          if (topicToSelect && (!this.activeTopic || this.activeTopic.id !== topicToSelect.id)) {
            console.log('11. Dispatching selectTopic from topics watcher with:', topicToSelect);
            this.selectTopic(topicToSelect);
          } else if (!topicToSelect) {
             console.warn(`12. In topics watcher: Topic with ID ${this.topicId} NOT found in newly updated topics array.`);
          } else {
             console.log('13. Topics watcher: Topic already active or no change needed.');
          }
        } else {
            console.log('14. Topics watcher: New topics array is empty, or topicId is missing.');
        }
        console.log('--- Watcher: topics handler finished ---');
      }
    },
    // Add a watcher for activeTopic to see when it changes
    activeTopic: {
      handler(newActiveTopic) {
        console.log('--- Watcher: activeTopic handler initiated ---');
        console.log('15. activeTopic updated to:', newActiveTopic);
        console.log('--- Watcher: activeTopic handler finished ---');
      },
      deep: true // Watch for changes inside the object
    }
  },
  created() {
    console.log('--- Component Created Hook ---');
    console.log('16. Messages (TopicDetails) component created.');
    console.log('17. Initial topicId prop:', this.topicId);
    console.log('18. Initial state.topics at created:', this.topics);
    console.log('19. Initial state.activeTopic at created:', this.activeTopic);
    console.log('--- Created Hook Finished ---');
  },
  mounted() {
    console.log('--- Component Mounted Hook ---');
    console.log('20. Messages (TopicDetails) component mounted.');
    console.log('21. State.topics at mounted:', this.topics);
    console.log('22. ActiveTopic at mounted:', this.activeTopic);
    console.log('--- Mounted Hook Finished ---');
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