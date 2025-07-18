import Vue from 'vue'
import Vuex from 'vuex'

// Import your readit.json file directly
// Adjust the path below based on where you actually place your readit.json file
import initialData from '@/data/readit.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Initialize topics with the data from readit.json
    topics: initialData.topics || [],
    allMessages: initialData.messages || [],
    // Use || [] to ensure it's an array even if topics is missing in JSON
    // You might also want to initialize activeTopic and activeMessage based on initialData if desired
    // For now, we'll keep them as they were, assuming they'll be set dynamically later.
    activeTopic: {
      id: 0,
      title: '',
      messages: []
    },
    activeMessage: {
      id: null,
      topicId: null,
      title: '',
      messageText: ''
    }
  },
  mutations: {
    SET_TOPICS(state, data) {
      state.topics = data;
    },
    SET_ACTIVE_TOPIC(state, topic) {
      const messagesForThisTopic = state.allMessages.filter(
        message => message.topicId === topic.id
      );

      // Set the active topic and its associated messages
      state.activeTopic = {
        id: topic.id,
        title: topic.title,
        messages: messagesForThisTopic // Assign the filtered messages here!
      };
    },
    DELETE_MESSAGE(state, id) {
      // First, remove the message from the global list of all messages
     state.allMessages = state.allMessages.filter(message => message.id !== id);

      // Then, update the messages within the currently active topic
      // (This ensures consistency if the deleted message was part of the active topic)
      if (state.activeTopic && state.activeTopic.messages) {
        state.activeTopic.messages = state.activeTopic.messages.filter(message => message.id !== id);
      }
    },
    SET_ACTIVE_MESSAGE(state, newMessage) {
      // Add the new message to the global list
      state.allMessages.push(newMessage);
      // If the new message belongs to the current active topic, also add it there
      if (state.activeTopic.id === newMessage.topicId) {
        state.activeTopic.messages.push(newMessage);
      }
    },
  },
  actions: {
    // *** NEW: Action to handle selecting a topic ***
    selectTopic({ commit }, topic) {
      commit('SET_ACTIVE_TOPIC', topic);
    },
    // Example action for deleting a message (call this from components)
    deleteMessage({ commit }, messageId) {
      commit('DELETE_MESSAGE', messageId);
    },
    // Example action for adding a message (call this from components)
    addMessage({ commit }, message) {
      // You'll likely generate ID and topicId here or pass them in from the component
      // For example: message.id = Date.now();
      commit('ADD_MESSAGE', message);
    }
  },
  modules: {
  }
})