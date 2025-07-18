import Vue from 'vue'
import Vuex from 'vuex'

// Import your readit.json file directly.
// Adjust the path if your file location changes.
import initialData from '@/data/readit.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Application's initial data loaded from readit.json
    topics: initialData.topics || [], // All available topics
    allMessages: initialData.messages || [], // All messages across all topics

    // Currently selected topic and its associated messages
    activeTopic: {
      id: 0,
      title: '',
      messages: [] // Populated dynamically based on active topic
    },

    // Not directly used for messages display, but could be for single message editing
    activeMessage: {
      id: null,
      topicId: null,
      title: '',
      messageText: ''
    }
  },

  mutations: {
    // --- Topic Mutations ---
    SET_TOPICS(state, data) {
      state.topics = data;
    },
    SET_ACTIVE_TOPIC(state, topic) {
      // Filter all messages to get only those belonging to the selected topic
      const messagesForThisTopic = state.allMessages.filter(
        message => message.topicId === topic.id
      );

      // Update the active topic state with its details and filtered messages
      state.activeTopic = {
        id: topic.id,
        title: topic.title,
        messages: messagesForThisTopic
      };
    },
    ADD_TOPIC(state, newTopic) {
      state.topics.push(newTopic);
    },
    UPDATE_TOPIC(state, updatedTopic) {
      const index = state.topics.findIndex(t => t.id === updatedTopic.id);
      if (index !== -1) {
        state.topics.splice(index, 1, updatedTopic); // Replace the topic object
      }
    },
    DELETE_TOPIC(state, id) {
      state.topics = state.topics.filter(topic => topic.id !== id);
      state.allMessages = state.allMessages.filter(message => message.topicId !== id); // Remove associated messages

      // Clear active topic if it was the one deleted
      if (state.activeTopic.id === id) {
        state.activeTopic = { id: 0, title: '', messages: [] };
      }
    },

    // --- Message Mutations ---
    ADD_MESSAGE(state, newMessage) {
      state.allMessages.push(newMessage); // Add to global list
      // If the new message belongs to the current active topic, also add it there for immediate display
      if (state.activeTopic.id === newMessage.topicId) {
        state.activeTopic.messages.push(newMessage);
      }
    },
    UPDATE_MESSAGE(state, updatedMessage) {
      // Update in global allMessages array
      const allMessagesIndex = state.allMessages.findIndex(msg => msg.id === updatedMessage.id);
      if (allMessagesIndex !== -1) {
        state.allMessages.splice(allMessagesIndex, 1, updatedMessage);
      }

      // Update in active topic's messages array, if applicable
      if (state.activeTopic && state.activeTopic.id === updatedMessage.topicId) {
        const activeTopicMessageIndex = state.activeTopic.messages.findIndex(msg => msg.id === updatedMessage.id);
        if (activeTopicMessageIndex !== -1) {
          state.activeTopic.messages.splice(activeTopicMessageIndex, 1, updatedMessage);
        }
      }
    },
    DELETE_MESSAGE(state, id) {
      state.allMessages = state.allMessages.filter(message => message.id !== id); // Remove from global list

      // Remove from active topic's messages if present
      if (state.activeTopic && state.activeTopic.messages) {
        state.activeTopic.messages = state.activeTopic.messages.filter(message => message.id !== id);
      }
    },
    SET_ACTIVE_MESSAGE(state, message) {
      // This mutation is used to set a specific message for editing/viewing (if needed)
      state.activeMessage = message;
    }
  },

  actions: {
    // --- Topic Actions ---
    selectTopic({ commit }, topic) {
      commit('SET_ACTIVE_TOPIC', topic);
    },
    addTopic({ commit }, topic) {
      // Simulate async operation and commit mutation
      return new Promise((resolve) => {
        commit('ADD_TOPIC', topic);
        resolve();
      });
    },
    updateTheTopic({ commit }, topic) {
      // Simulate async operation and commit mutation
      return new Promise((resolve) => {
        commit('UPDATE_TOPIC', topic);
        resolve();
      });
    },
    deleteTopic({ commit }, topicId) {
      // Simulate async operation and commit mutation
      return new Promise((resolve) => {
        commit('DELETE_TOPIC', topicId);
        resolve();
      });
    },

    // --- Message Actions ---
    addMessage({ commit }, message) {
      // Simulate async operation and commit mutation
      return new Promise((resolve) => {
        commit('ADD_MESSAGE', message);
        resolve();
      });
    },
    updateTheMessage({ commit }, message) {
      // Simulate async operation and commit mutation
      return new Promise((resolve) => {
        commit('UPDATE_MESSAGE', message);
        resolve();
      });
    },
    deleteMessage({ commit }, messageId) {
      // Simulate async operation and commit mutation
      return new Promise((resolve) => {
        commit('DELETE_MESSAGE', messageId);
        resolve();
      });
    },
    setActiveMessage({ commit }, message) {
        commit('SET_ACTIVE_MESSAGE', message);
    }
  },
  modules: {
  }
})