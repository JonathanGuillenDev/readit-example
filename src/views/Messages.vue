<template>
  <div class="messages">
    <topic-details :topic-id="topicId" />
  </div>
</template>

<script>
import TopicDetails from "@/components/TopicDetails.vue";

export default {
  name: "Messages", // This component's name
  // IMPORTANT: Since the router config for the 'Messages' route has 'props: true',
  // this component (Messages.vue) *must* declare 'topicId' as a prop
  // to receive the route parameter.
  props: {
    topicId: [Number, String] // Declare topicId as a prop, as expected from the router
  },
  components: {
    TopicDetails
  },
  created() {
    console.log('Messages.vue created. Received topicId prop from router:', this.topicId);
  }
};
</script>