<template>
  <el-tabs type="border-card" :style="`background-color: ${color};`" class="tab">
    <el-tab-pane label="样式预览">
      <iframe id="frame" :src="blob_url" class="preview-frame"></iframe>
    </el-tab-pane>
    <el-tab-pane label="真实预览">
      <iframe id="frame" :src="blob_download_url" class="preview-frame"></iframe>
    </el-tab-pane>
    <el-button style="width: 100%;" type="success" @click="download()">下载</el-button>
  </el-tabs>
</template>

<script>
import { generate_preview_html, generate_html } from '../scripts/template';
export default {
  data() {
    return {
      blob: undefined,
      blob_url: '',
      blob_download: undefined,
      blob_download_url: '',
    }
  },
  props: {
    config: String,
    color: String,
  },
  methods: {
    download() {
      const aLink = document.createElement('a');
      aLink.href = this.blob_download_url;
      aLink.setAttribute('download', 'danmu.html');
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    }
  },
  watch: {
    config(new_config) {
      const frame = document.getElementById('frame');
      this.blob = new Blob([generate_preview_html(JSON.parse(new_config))], { type: 'text/html' });
      this.blob_download = new Blob([generate_html(JSON.parse(new_config))], { type: 'text/html' });
      this.blob_url = URL.createObjectURL(this.blob);
      this.blob_download_url = URL.createObjectURL(this.blob_download);
      frame.src = this.blob_url;
    }
  },
  beforeMount() {
    this.blob = new Blob([generate_preview_html(JSON.parse(this.config))], { type: 'text/html' });
    this.blob_download = new Blob([generate_html(JSON.parse(this.config))], { type: 'text/html' });
    this.blob_url = URL.createObjectURL(this.blob);
    this.blob_download_url = URL.createObjectURL(this.blob_download);
  }
}
</script>

<style scoped>
.preview-frame {
  height: 500px;
  width: 310px;
  border: none;
}

.tab {
  box-shadow: var(--el-box-shadow-light);
}
</style>