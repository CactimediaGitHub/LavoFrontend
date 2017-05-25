import Ember from 'ember';
import imageCropper from 'ember-cli-image-cropper/components/image-cropper';
const { get } = Ember;
export default imageCropper.extend({
  aspectRatio: 1,
  minCropBoxWidth: 150,
  minCropBoxHeight: 150,
  minContainerWidth: 150,
  minContainerHeight: 150,
  croppedImageWidth: 400,
  croppedImageHeight: 400,
  zoomable: false,
  cropperContainer: '.cropper-container > img',
  previewClass: '.img-preview',
  isLoading:false,
  croppedAvatar: null,
  modelProperty: null,
  dataUrl: null,
  actions: {
    getCroppedAvatar: function() {
      var container = this.$(this.get('cropperContainer'));
    },
    apply() {
      let croppedImage = this.$(this.get('cropperContainer')).cropper('getCroppedCanvas');
      let canvas = document.createElement('canvas');
      canvas.width = get(this, 'croppedImageWidth');
      canvas.height = get(this, 'croppedImageHeight');

      let ctx = canvas.getContext('2d');
      ctx.drawImage(croppedImage, 0, 0, canvas.width, canvas.height);

      this.set('modelProperty', canvas.toDataURL('image/jpeg', 1));
      this.set('dataUrl', null);
    },
    cancel() {
      this.set('dataUrl', null);
    },
    setAvatar(file) {
      let that = this;
      var fileReader = new FileReader();
      this.set('isLoading',true);
      fileReader.onloadend = function(e) {
        that.set('dataUrl', e.target.result);
        that.set('isLoading',false);
      };
      //Its just doesnt load image from camera when you call `readAsDataUrl` directly
      let interval = setInterval(function() {
        if (file.size>0) {
          fileReader.readAsDataURL(file);
          clearInterval(interval);
        }
      }, 500);
    }
  }
});
