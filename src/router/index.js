import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Messages from '@/views/Messages.vue'; // This is your TopicDetails.vue component
import AddMessage from '@/views/AddMessage.vue';
import AddTopic from '@/views/AddTopic.vue';
import EditTopic from '@/views/EditTopic.vue';
import NotFound from '@/views/NotFound.vue';
import EditMessage from '@/views/EditMessage';

Vue.use(VueRouter);

const routes = [
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-topic',
    name: 'AddTopic',
    component: AddTopic
  },
  {
    path: '/edit-topic/:id',
    name: 'EditTopic',
    component: EditTopic,
    props: true // Add props: true to pass the 'id' param as a prop
  },
  {
    // MODIFIED: Make the path explicit for clarity and consistency
    // It's good practice to name the param the same as the prop if you use props: true
    path: '/topics/:topicId', // Changed from /:id to /topics/:topicId for better URL structure
    name: 'Messages', // This refers to your Messages.vue (TopicDetails.vue)
    component: Messages,
    props: true // Crucial: This passes the 'topicId' parameter as a prop to the Messages component
  },
  {
    // MODIFIED: Ensure path is consistent with Messages route if using :topicId
    path: '/topics/:topicId/add-message', // Consistent with /topics/:topicId
    name: 'AddMessage',
    component: AddMessage,
    props: true // Pass topicId as a prop
  },
  {
    // MODIFIED: Ensure path is consistent
    path: '/topics/:topicId/edit-message/:messageId', // Consistent with /topics/:topicId
    name: 'EditMessage',
    component: EditMessage,
    props: true // Pass topicId and messageId as props
  },
  // Optional: Catch-all for undefined routes, redirect to NotFound
  {
    path: '/:catchAll(.*)', // For Vue Router 4, it's /:pathMatch(.*)* or /:catchAll(.*)
    redirect: '/not-found' // Redirects any unmatched routes
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;