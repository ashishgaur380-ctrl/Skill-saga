package com.skillsaga.app

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : Activity() {
    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = true
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView, url: String) {
                super.onPageFinished(view, url)
                // The production WebView bundle uses the tested baseline HTML filename.
                // Load the finalized UI layers after the baseline page is ready so the
                // Android APK and hosted/web version use the same learner experience.
                view.evaluateJavascript(
                    """
                    (function(){
                      if(window.__skillSagaFinalLayersLoaded)return;
                      window.__skillSagaFinalLayersLoaded=true;
                      function add(src,next){
                        var s=document.createElement('script');
                        s.src=src;
                        s.onload=next;
                        s.onerror=function(){console.warn('Skill Saga asset failed: '+src); if(next)next();};
                        document.head.appendChild(s);
                      }
                      add('feature-config.js',function(){
                        add('final-ui.js',function(){
                          add('final-ui-links.js',function(){});
                        });
                      });
                    })();
                    """.trimIndent(),
                    null
                )
            }
        }
        webView.webChromeClient = WebChromeClient()
        webView.loadUrl("file:///android_asset/SkillSaga-working-baseline-index.html")

        setContentView(webView)
    }

    @Deprecated("Deprecated in Android API 33")
    override fun onBackPressed() {
        if (webView.canGoBack()) webView.goBack() else super.onBackPressed()
    }
}