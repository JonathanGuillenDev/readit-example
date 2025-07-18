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
        messages: messagesForThisTopic
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
    // IMPORTANT: SET_ACTIVE_MESSAGE usually sets a specific message for editing/viewing.
    // If you intend for this mutation to *add* a new message, you should rename it to something like ADD_MESSAGE.
    // I've renamed it below to ADD_MESSAGE based on its current implementation.
    ADD_MESSAGE(state, newMessage) { // Renamed from SET_ACTIVE_MESSAGE to clarify intent
      // Add the new message to the global list
      state.allMessages.push(newMessage);
      // If the new message belongs to the current active topic, also add it there
      if (state.activeTopic.id === newMessage.topicId) {
        state.activeTopic.messages.push(newMessage);
      }
    },
    // *** NEW: DELETE_TOPIC mutation ***
    DELETE_TOPIC(state, id) {
      // Remove the topic from the topics array
      state.topics = state.topics.filter(topic => topic.id !== id);

      // Also remove all messages associated with this topic from the global allMessages array
      state.allMessages = state.allMessages.filter(message => message.topicId !== id);

      // If the deleted topic was the active one, clear activeTopic or set a new default
      if (state.activeTopic.id === id) {
        state.activeTopic = { id: 0, title: '', messages: [] }; // Clear active topic
      }
    }
  },
  actions: {
    selectTopic({ commit }, topic) {
      commit('SET_ACTIVE_TOPIC', topic);
    },
    deleteMessage({ commit }, messageId) {
      commit('DELETE_MESSAGE', messageId);
    },
    addMessage({ commit }, message) {
      // You'll likely generate ID and topicId here or pass them in from the component
      // For example: message.id = Date.now(); // Simple ID generation for static data
      commit('ADD_MESSAGE', message);
    },
    // *** NEW: deleteTopic action ***
    deleteTopic({ commit }, topicId) {
      // For a static JSON setup, the action just commits the mutation.
      // If you later add a backend, this is where you'd put the API call.
      commit('DELETE_TOPIC', topicId);
    }
  },
  modules: {
  }
})