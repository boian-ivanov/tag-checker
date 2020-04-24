<template>
  <Layout>

    <b-field label="Instagram Hashtag Checker">
      <b-input v-model="queryStr" v-on:keyup.enter.native="getTags"></b-input>
    </b-field>

    <b-field>
      <b-button @click="getTags">Submit</b-button>
    </b-field>
    <!--    <h2> {{ tags }} </h2>-->
    <b-field label="Result">
      <b-input type="textarea" v-model="tags"></b-input>
    </b-field>

    <b-field>
      <b-button @click="copyTags">Copy</b-button>
    </b-field>

    <div><strong>Count : </strong>{{str_arr}}</div>
    <div><strong>Duplicated : </strong>{{hashtags}}</div>
  </Layout>
</template>

<script>
import axios from 'axios'

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  data: () => ({
    queryStr: '',
    endpoint: '.netlify/functions/getTags',
    tags: ''
  }),
  methods: {
    async getTags () {
      const loadingComponent = this.$buefy.loading.open({container:null})
      let response = await axios.get(this.endpoint + '?tag=' + this.queryStr)
      loadingComponent.close()

      this.tags = this.tags === '' ? response.data.tags : this.tags + ' ' + response.data.tags
      this.queryStr = ''
    },
    copyTags () {
      this.$copyText(this.tags)
    }
  },
  computed: {
    arrayTags () {
      return this.tags.split(' ')
    },
    hashtags () {
      return this.arrayTags.reduce(function (acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el)
        return acc
      }, [])
    },
    str_arr () {
      return this.tags.length > 0 ? this.arrayTags.length : ''
    }
  }
}
</script>
