<template>
  <Layout>

    <b-field label="Instagram Hashtag Checker">
      <b-input v-model="queryStr" v-on:keyup.enter.native="getTags"></b-input>
    </b-field>

    <div class="buttons">
      <b-button @click="getTags" type="is-primary">Submit</b-button>
    </div>

    <b-field label="Result">
      <b-input type="textarea" v-model="tagsString"></b-input>
    </b-field>

    <div class="buttons">
      <b-button @click="copyTags" type="is-success">Copy</b-button>
      <b-button @click="removeDuplicateTags" type="is-warning">Remove duplicates</b-button>
      <b-button @click="cleanUpList" type="is-info">Remove unwanted</b-button>
      <b-button @click="clearTags" type="is-danger">Clean tags</b-button>
    </div>

    <div><strong>Count : </strong>{{numberOfTags}}</div>
    <div><strong>Duplicated : </strong>{{duplicateTags}}</div>
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
    endpoint: '/.netlify/functions/getTags',
    arrayTags: [],
    blacklist: [
      '#bhfyp', '#like', '#likes', '#likeforlikes', '#ig', '#instagram', '#follow',
      '#followforfollow', '#me', '#girl', '#memes', '#selfie', '#boy', ]
  }),
  methods: {
    async getTags () {
      const loadingComponent = this.$buefy.loading.open({ container: null })
      try {
        let response = await axios.get(this.endpoint + '?tag=' + this.queryStr)

        this.makeTagsIntoArray(response.data.tags)
        this.resetQueryString()
      } catch (e) {
        this.$buefy.dialog.alert('Something went wrong! It\'s possible that the requested tag doesn\'t exist')
      }
      loadingComponent.close()
    },
    makeTagsIntoArray (tags) {
      this.arrayTags = this.arrayTags.concat(tags.split(' '))
    },
    resetQueryString () {
      this.queryStr = ''
    },
    copyTags () {
      this.$copyText(this.tagsString)
    },
    removeDuplicateTags () {
      this.arrayTags = this.removeDuplicateFromArray(this.arrayTags, this.duplicateTags)
    },
    cleanUpList () {
      this.arrayTags = this.removeDuplicateFromArray(this.arrayTags, this.blacklist)
      this.arrayTags = this.arrayTags.filter(el => el.length > 3)
    },
    clearTags () { this.arrayTags = [] },
    /**
     * Remove elements of one array from another
     *
     * @param array - Array to remove elements from
     * @param elementsToRemove - Array of elements to remove from first parameter
     * @return Array without the given elements of second array
     */
    removeDuplicateFromArray (array, elementsToRemove) {
      return array.filter(el => !elementsToRemove.includes(el))
    }
  },
  computed: {
    duplicateTags () {
      return this.arrayTags.reduce(function (acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el)
        return acc
      }, [])
    },
    tagsString () {
      return this.arrayTags.join(' ')
    },
    numberOfTags () {
      return this.arrayTags.length
    }
  }
}
</script>
