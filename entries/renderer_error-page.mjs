import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
const _sfc_main = {
  __name: "_error.page",
  __ssrInlineRender: true,
  props: ["is404"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.is404) {
        _push(`<div${ssrRenderAttrs(_attrs)}><h1>404 Page Not Found</h1><p>This page could not be found.</p></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}><h1>500 Internal Error</h1><p>Something went wrong.</p></div>`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("renderer/_error.page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
