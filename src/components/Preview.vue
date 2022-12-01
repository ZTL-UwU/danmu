<template>
  <iframe id="frame" :src="blob_url" class="preview-frame"></iframe>
  <el-button style="width: 100%;" type="success" @click="download()">下载</el-button>
</template>

<script>
import { generate_html } from '../scripts/template';
export default {
  data() {
    return {
      blob: undefined,
      blob_url: '',
    }
  },
  props: {
    config: String,
  },
  methods: {
    download() {
      const aLink = document.createElement('a');
      aLink.href = this.blob_url;
      aLink.setAttribute('download', 'danmu.html');
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    }
  },
  watch: {
    config(new_config) {
      const frame = document.getElementById('frame');
      this.blob = new Blob([generate_html(JSON.parse(new_config))], { type: 'text/html' });
      this.blob_url = URL.createObjectURL(this.blob);
      frame.src = this.blob_url;
    }
  },
  beforeMount() {
    this.blob = new Blob([generate_html(JSON.parse(this.config))], { type: 'text/html' });
    this.blob_url = URL.createObjectURL(this.blob);
  }
}
</script>

<style scoped>
.preview-frame {
  height: 500px;
  width: 310px;
  border: none;
}
</style>