import { Helmet } from "react-helmet";

const MetaPixel = () => {
  const pixelID = import.meta.env.VITE_PIXEL_ID;
  return (
    <>
      <Helmet>
        <script id="facebook-pixel-script">
          {`
          !function(f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function() {
              n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = "2.0";
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
          }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

          fbq("init", ${pixelID});
          fbq("track", "PageView");

          fbq('track', 'ViewContent');
          `}
        </script>
        <noscript id="facebook-pixel-image">
          {`
        <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=${pixelID}&ev=PageView&noscript=1"
        alt="Facebook Pixel"
      />`}
        </noscript>




        


      </Helmet>
    </>
  );
};

export default MetaPixel;
