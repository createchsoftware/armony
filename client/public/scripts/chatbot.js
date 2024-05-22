(function(d, t) {
    var v = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    v.onload = function() {
        window.voiceflow.chat.load({
            verify: {
                projectID: (url => new URL(url).searchParams.values().next().value)([...document.querySelectorAll('script[src]')].find(script => script.src.includes('chatbot.js'))?.src)
            },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production'
        });
    }
    v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    v.type = "text/javascript";
    s.parentNode.insertBefore(v, s);
})(document, 'script');