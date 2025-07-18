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
    messages: initialData.messages || [],
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
    SET_ACTIVE_TOPIC(state, data) {
      state.activeTopic = data;
    },
    DELETE_MESSAGE(state, id) {
      // You'll need to update this logic if messages are directly tied to activeTopic's messages array
      // based on initial data structure.
      state.activeTopic.messages.splice(
        state.activeTopic.messages.findIndex(message => message.id === id),
        1
      )
    },
    SET_ACTIVE_MESSAGE(state, data) {
      state.activeMessage = data;
    },
  },
  actions: {
    // You might still want an action to set the initial data,
    // especially if you want to perform other operations after loading.
    // However, for simply populating the state, direct initialization is sufficient.
    initializeStore({ commit }) {
      // If you want to use the mutation for setting topics (e.g., if there's more complex logic)
      // commit('SET_TOPICS', initialData.topics);

      // You might also want to set an initial active topic or message here if needed
      // commit('SET_ACTIVE_TOPIC', initialData.topics[0]); // Example: set first topic as active
    }
  },
  modules: {
  }
})