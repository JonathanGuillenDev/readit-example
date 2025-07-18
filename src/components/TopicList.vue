<template>
  <div class="topic-list">
    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="topic in topics" :key="topic.id">
          <td width="80%">
            <router-link
              :to="{ name: 'Messages', params: { id: topic.id } }"
              @click.native="selectTopic(topic)"
            >
              {{ topic.title }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'EditTopic', params: {id: topic.id} }">Edit</router-link>
          </td>
          <td>
            <a href="#" @click.prevent="confirmAndDeleteTopic(topic.id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// No longer importing topicService here if we're purely using static JSON in store
// import topicService from "@/services/TopicService.js"; // REMOVE THIS LINE

import { mapState, mapActions } from 'vuex'; // Import mapState and mapActions

export default {
  name: "topic-list",
  computed: {
    ...mapState(['topics']) // Map the 'topics' state from your Vuex store
  },
  methods: {
    // Map the actions you've defined in your store
    ...mapActions(['selectTopic', 'deleteTopic']), // Assuming you'll create a deleteTopic action in store

    // Removed getTopics() because data is initialized directly in store
    // You might want an action to set an initial active topic when the app loads
    // if you don't already handle this via router or in App.vue.

    confirmAndDeleteTopic(id) {
      if (confirm("Are you sure you want to delete this topic and all its messages?")) {
        // Dispatch the deleteTopic action in your store
        this.deleteTopic(id);
      }
    }
  },
  created() {
    // No need to call getTopics() here anymore because state.topics is already populated
    // from initialData in store/index.js upon app load.
    // If you want to set an initial active topic when the list first loads, do it here:
    // if (this.topics.length > 0 && !this.$store.state.activeTopic.id) {
    //   this.selectTopic(this.topics[0]); // Select the first topic by default
    // }
  }
};
</script>

<style>
.topic-list {
  margin: 0 auto;
  max-width: 800px;
}
.topic {
  font-size: 24px;
  border-bottom: 1px solid #f2f2f2;
  padding: 10px 20px;
}
.topic:last-child {
  border: 0px;
}
table {
  text-align: left;
  width: 800px;
  border-collapse: collapse;
}
td {
  padding: 4px;
}
tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.topic-list a:link,
.topic-list a:visited {
  color: blue;
  text-decoration: none;
}
.topic-list a:hover {
  text-decoration: underline;
}
</style>
