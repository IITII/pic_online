<template>
  <div>
    <div>
      <el-dialog
          :center="dialog.center"
          :close-on-click-modal="dialog.close_on_click_modal"
          :close-on-press-escape="dialog.close_on_press_escape"
          :lock-scroll="dialog.lock_scroll"
          :show-close="dialog.show_close"
          :title="dialog.title"
          :visible.sync="setting_visible_sync"
          :fullscreen="dialog.fullscreen"
          :width="dialog_width"
      >
        <el-form :model="form">
          <el-form-item
              :label-width="formLabelWidth"
              label="URL"
          >
            <el-input
                v-model="form.url"
                autocomplete="off"
                class="full-width"
                clearable
                type="url"
            ></el-input>
          </el-form-item>
          <el-form-item
              :label-width="formLabelWidth"
              label="请求方式"
          >
            <el-select
                v-model="form.method"
                :span="dialog.span"
                class="full-width"
                clearable
                placeholder="请选择请求方式"
            >
              <el-option
                  v-for="(item,index) in dialog.methods"
                  :key="index"
                  :disabled="item.disabled"
                  :label="item.name"
                  :value="item.value"
              />
              <!--              <el-option label="GET" value="GET"></el-option>-->
              <!--              <el-option label="POST" value="POST" disabled></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group
                v-model="form.checkbox_group_checked"
                class="el-dialog--center"
                @change="checkbox_group_change"
            >
              <el-checkbox
                  v-for="(label,index) in dialog.checkbox_group.labels"
                  :key="index"
                  :data_value="index"
                  :label="label"
              />
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit_setting">确 定</el-button>
          <el-button plain type="warning" @click="removeAll">清空所有数据</el-button>
          <el-button plain type="info" @click="setting_visible_sync = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {adaptiveLayout, isEmptyString} from '@/utils/validate';
import {remove} from '@/utils/data_persistent';

export default {
  name: "setting",
  props: {
    // setting_visible_sync: {
    //   require: true,
    //   type: Boolean,
    // },
    // before_close: {
    //   require: false,
    //   type: Function,
    // }
  },
  data() {
    return {
      setting_visible: false,
      dialog: {
        modal: true,
        title: '设置',
        lock_scroll: true,
        close_on_click_modal: true,
        close_on_press_escape: true,
        show_close: true,
        center: true,
        span: 24,
        fullscreen: false,
        methods: [
          {
            name: 'GET',
            value: 'GET',
            disabled: false,
          }, {
            name: 'POST',
            value: 'POST',
            disabled: true,
          }],
        checkbox_group: {
          labels: [
            '显示图片标题'
          ],
          map_label_index: '',
        },
      },
      form: {
        url: '',
        method: '',
        checkbox_group_checked: [],
      },
      formLabelWidth: '5rem',
    }
  },
  methods: {
    submit_setting: function () {
      // 需要考虑 url 不以 http 开头的情况
      if (isEmptyString(this.form.url)) {
        this.$notify({
          title: '无效的URL',
          message: `请填写有效的URL`,
          type: 'error'
        });
        return;
      }
      if (isEmptyString(this.form.method) || ['GET'].indexOf(this.form.method) < 0) {
        this.$notify({
          title: '无效的请求方式',
          message: `请选择有效的请求方式`,
          type: 'error'
        });
        return;
      }
      this.$log.debug(`submitting: ${JSON.stringify(this.form)}`);
      this.$store.dispatch('api_setting/changeUrl', this.form.url);
      this.$store.dispatch('api_setting/changeMethod', this.form.method);
      this.$store.dispatch('ui_control/setCheckboxGroup', this.checkbox_group_index);
      this.$notify({
        title: '设置已修改',
        message: `请刷新查看结果`,
        type: 'success'
      });
      this.setting_visible_sync = false;
    },
    checkbox_group_change: function () {
      this.$log.debug(`${this.form.checkbox_group_checked}`);
      this.$log.debug(`${this.checkbox_group_index}`)
    },
    removeAll: function () {
      remove();
      this.$notify({
        title: '数据已清空',
        message: `请刷新查看结果`,
        type: 'success'
      });
    },
  },
  // watch: {
  //   'form.checkbox_group.checked': function (val) {
  //     this.$log.debug(val);
  //   }
  // },
  computed: {
    setting_visible_sync: {
      get: function () {
        return this.$store.getters['ui_control/showSettingDialog'];
      },
      set: function () {
        this.$store.dispatch('ui_control/reverseShowSettingDialog');
      }
    },
    checkbox_group_index: {
      get: function () {
        let tmp = [];
        this.form.checkbox_group_checked.forEach(ele => {
          tmp.push(this.dialog.checkbox_group.map_label_index.get(ele));
        });
        return tmp;
      },
    },
    dialog_width: function () {
      const width = ['50%', '90%'];
      return adaptiveLayout(width[0], width[1]);
    }
  },
  mounted() {
    let tmp = new Map();
    this.dialog.checkbox_group.labels.forEach((value, index) => {
      tmp.set(value, index);
    });
    let tmpArr = [];
    // checked group
    let checked = this.$store.getters['ui_control/checkboxGroup'];
    checked.forEach(index => {
      tmpArr.push(this.dialog.checkbox_group.labels[index]);
    });
    this.form.checkbox_group_checked = tmpArr;

    this.dialog.checkbox_group.map_label_index = tmp;
    this.form.url = this.$store.getters['api_setting/url'];
    this.form.method = this.$store.getters['api_setting/method'];
  }
}
</script>

<style scoped>

input, select {
  /*vertical-align: middle;*/
}
</style>