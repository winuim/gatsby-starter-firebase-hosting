import CMS from "netlify-cms-app"
import cloudinary from "netlify-cms-media-library-cloudinary"
import uploadcare from "netlify-cms-media-library-uploadcare"

import BlogPostPreview from "./preview-templates/BlogPostPreview"

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate("blog", BlogPostPreview)
