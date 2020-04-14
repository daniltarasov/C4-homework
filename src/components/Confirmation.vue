<template>
  <div>
    <b-alert v-model="showDisAlert"
           variant="success"
           dismissible @dismissed="dissmissed">{{ messag }}</b-alert>
  </div>
</template>

<script>


export default
{
  // props: ['messag'],
  props:
  {
    messag: String,
    showDisAlert: Boolean,
  },
  methods: {

    dissmissed() {
      this.$emit('closed');
    },
  },


};

</script>
