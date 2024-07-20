import { Cloudinary } from "@cloudinary/url-gen/index";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { AutoGravity } from "@cloudinary/url-gen/qualifiers/gravity/autoGravity/AutoGravity";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dweggareb",
    apiKey: "638341914463165",
    apiSecret: "ZIc5CKKYmbnhLkIrExEaVRyCg5A",
  },
});

export default cld;
