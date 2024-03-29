!(function (e) {
  if (
    "object" == typeof exports &&
    "undefined" != typeof module
  )
    module.exports = e();
  else if (
    "function" == typeof define &&
    define.amd
  )
    define([], e);
  else {
    var n;
    "undefined" != typeof window
      ? (n = window)
      : "undefined" != typeof global
      ? (n = global)
      : "undefined" != typeof self && (n = self),
      (n.omnivore = e());
  }
})(function () {
  var e;
  return (function r(e, n, t) {
    function o(u, a) {
      if (!n[u]) {
        if (!e[u]) {
          var s =
            "function" == typeof require &&
            require;
          if (!a && s) return s(u, !0);
          if (i) return i(u, !0);
          var f = new Error(
            "Cannot find module '" + u + "'",
          );
          throw (
            ((f.code = "MODULE_NOT_FOUND"), f)
          );
        }
        var c = (n[u] = { exports: {} });
        e[u][0].call(
          c.exports,
          function (n) {
            var r = e[u][1][n];
            return o(r ? r : n);
          },
          c,
          c.exports,
          r,
          e,
          n,
          t,
        );
      }
      return n[u].exports;
    }
    for (
      var i =
          "function" == typeof require && require,
        u = 0;
      u < t.length;
      u++
    )
      o(t[u]);
    return o;
  })(
    {
      1: [
        function (e, n) {
          function r(e, n) {
            "addData" in e && e.addData(n),
              "setGeoJSON" in e &&
                e.setGeoJSON(n);
          }
          function t(e, n, t) {
            var o = t || L.geoJson();
            return (
              m(e, function (e, n) {
                return e
                  ? o.fire("error", { error: e })
                  : (r(
                      o,
                      JSON.parse(n.responseText),
                    ),
                    void o.fire("ready"));
              }),
              o
            );
          }
          function o(e, n, r) {
            function t(e, r) {
              return e
                ? o.fire("error", { error: e })
                : (c(r.responseText, n, o),
                  void o.fire("ready"));
            }
            var o = r || L.geoJson();
            return m(e, t), o;
          }
          function i(e, n, r) {
            function t(e, r) {
              function t() {
                i = !0;
              }
              var i;
              return e
                ? o.fire("error", { error: e })
                : (o.on("error", t),
                  l(r.responseText, n, o),
                  o.off("error", t),
                  void (i || o.fire("ready")));
            }
            var o = r || L.geoJson();
            return m(e, t), o;
          }
          function u(e, n, r) {
            function t(e, r) {
              function t() {
                i = !0;
              }
              var i;
              return e
                ? o.fire("error", { error: e })
                : (o.on("error", t),
                  p(
                    r.responseXML ||
                      r.responseText,
                    n,
                    o,
                  ),
                  o.off("error", t),
                  void (i || o.fire("ready")));
            }
            var o = r || L.geoJson();
            return m(e, t), o;
          }
          function a(e, n, r) {
            function t(e, r) {
              function t() {
                i = !0;
              }
              var i;
              return e
                ? o.fire("error", { error: e })
                : (o.on("error", t),
                  d(
                    r.responseXML ||
                      r.responseText,
                    n,
                    o,
                  ),
                  o.off("error", t),
                  void (i || o.fire("ready")));
            }
            var o = r || L.geoJson();
            return m(e, t), o;
          }
          function s(e, n, r) {
            function t(e, r) {
              return e
                ? o.fire("error", { error: e })
                : (h(r.responseText, n, o),
                  void o.fire("ready"));
            }
            var o = r || L.geoJson();
            return m(e, t), o;
          }
          function f(e, n, r) {
            function t(e, r) {
              return e
                ? o.fire("error", { error: e })
                : (g(r.responseText, n, o),
                  void o.fire("ready"));
            }
            var o = r || L.geoJson();
            return m(e, t), o;
          }
          function c(e, n, t) {
            var o =
              "string" == typeof e
                ? JSON.parse(e)
                : e;
            t = t || L.geoJson();
            for (var i in o.objects) {
              var u = E.feature(o, o.objects[i]);
              u.features
                ? r(t, u.features)
                : r(t, u);
            }
            return t;
          }
          function l(e, n, t) {
            function o(e, n) {
              return e
                ? t.fire("error", { error: e })
                : void r(t, n);
            }
            return (
              (t = t || L.geoJson()),
              (n = n || {}),
              y.csv2geojson(e, n, o),
              t
            );
          }
          function p(e, n, t) {
            var o = v(e);
            if (!o)
              return t.fire("error", {
                error: "Could not parse GPX",
              });
            t = t || L.geoJson();
            var i = S.gpx(o);
            return r(t, i), t;
          }
          function d(e, n, t) {
            var o = v(e);
            if (!o)
              return t.fire("error", {
                error: "Could not parse KML",
              });
            t = t || L.geoJson();
            var i = S.kml(o);
            return r(t, i), t;
          }
          function g(e, n, t) {
            (t = t || L.geoJson()), (n = n || {});
            for (
              var o = x.decode(e, n.precision),
                i = {
                  type: "LineString",
                  coordinates: [],
                },
                u = 0;
              u < o.length;
              u++
            )
              i.coordinates[u] = [
                o[u][1],
                o[u][0],
              ];
            return r(t, i), t;
          }
          function h(e, n, t) {
            t = t || L.geoJson();
            var o = w(e);
            return r(t, o), t;
          }
          function v(e) {
            return "string" == typeof e
              ? new DOMParser().parseFromString(
                  e,
                  "text/xml",
                )
              : e;
          }
          var m = e("corslite"),
            y = e("csv2geojson"),
            w = e("wellknown"),
            x = e("polyline"),
            E = e("topojson/topojson.js"),
            S = e("togeojson");
          (n.exports.polyline = f),
            (n.exports.polyline.parse = g),
            (n.exports.geojson = t),
            (n.exports.topojson = o),
            (n.exports.topojson.parse = c),
            (n.exports.csv = i),
            (n.exports.csv.parse = l),
            (n.exports.gpx = u),
            (n.exports.gpx.parse = p),
            (n.exports.kml = a),
            (n.exports.kml.parse = d),
            (n.exports.wkt = s),
            (n.exports.wkt.parse = h);
        },
        {
          corslite: 5,
          csv2geojson: 6,
          polyline: 9,
          togeojson: 10,
          "topojson/topojson.js": 11,
          wellknown: 12,
        },
      ],
      2: [function () {}, {}],
      3: [
        function (e, n) {
          n.exports = e(2);
        },
        {
          "/Users/tmcw/src/leaflet-omnivore/node_modules/browserify/lib/_empty.js": 2,
        },
      ],
      4: [
        function (e, n) {
          function r() {}
          var t = (n.exports = {});
          (t.nextTick = (function () {
            var e =
                "undefined" != typeof window &&
                window.setImmediate,
              n =
                "undefined" != typeof window &&
                window.MutationObserver,
              r =
                "undefined" != typeof window &&
                window.postMessage &&
                window.addEventListener;
            if (e)
              return function (e) {
                return window.setImmediate(e);
              };
            var t = [];
            if (n) {
              var o =
                  document.createElement("div"),
                i = new MutationObserver(
                  function () {
                    var e = t.slice();
                    (t.length = 0),
                      e.forEach(function (e) {
                        e();
                      });
                  },
                );
              return (
                i.observe(o, { attributes: !0 }),
                function (e) {
                  t.length ||
                    o.setAttribute("yes", "no"),
                    t.push(e);
                }
              );
            }
            return r
              ? (window.addEventListener(
                  "message",
                  function (e) {
                    var n = e.source;
                    if (
                      (n === window ||
                        null === n) &&
                      "process-tick" === e.data &&
                      (e.stopPropagation(),
                      t.length > 0)
                    ) {
                      var r = t.shift();
                      r();
                    }
                  },
                  !0,
                ),
                function (e) {
                  t.push(e),
                    window.postMessage(
                      "process-tick",
                      "*",
                    );
                })
              : function (e) {
                  setTimeout(e, 0);
                };
          })()),
            (t.title = "browser"),
            (t.browser = !0),
            (t.env = {}),
            (t.argv = []),
            (t.on = r),
            (t.addListener = r),
            (t.once = r),
            (t.off = r),
            (t.removeListener = r),
            (t.removeAllListeners = r),
            (t.emit = r),
            (t.binding = function () {
              throw new Error(
                "process.binding is not supported",
              );
            }),
            (t.cwd = function () {
              return "/";
            }),
            (t.chdir = function () {
              throw new Error(
                "process.chdir is not supported",
              );
            });
        },
        {},
      ],
      5: [
        function (e, n) {
          function r(e, n, r) {
            function t(e) {
              return (
                (e >= 200 && 300 > e) || 304 === e
              );
            }
            function o() {
              void 0 === a.status || t(a.status)
                ? n.call(a, null, a)
                : n.call(a, a, null);
            }
            var i = !1;
            if (
              "undefined" ==
              typeof window.XMLHttpRequest
            )
              return n(
                Error("Browser not supported"),
              );
            if ("undefined" == typeof r) {
              var u = e.match(
                /^\s*https?:\/\/[^\/]*/,
              );
              r =
                u &&
                u[0] !==
                  location.protocol +
                    "//" +
                    location.domain +
                    (location.port
                      ? ":" + location.port
                      : "");
            }
            var a = new window.XMLHttpRequest();
            if (r && !("withCredentials" in a)) {
              a = new window.XDomainRequest();
              var s = n;
              n = function () {
                if (i) s.apply(this, arguments);
                else {
                  var e = this,
                    n = arguments;
                  setTimeout(function () {
                    s.apply(e, n);
                  }, 0);
                }
              };
            }
            return (
              "onload" in a
                ? (a.onload = o)
                : (a.onreadystatechange =
                    function () {
                      4 === a.readyState && o();
                    }),
              (a.onerror = function (e) {
                n.call(this, e || !0, null),
                  (n = function () {});
              }),
              (a.onprogress = function () {}),
              (a.ontimeout = function (e) {
                n.call(this, e, null),
                  (n = function () {});
              }),
              (a.onabort = function (e) {
                n.call(this, e, null),
                  (n = function () {});
              }),
              a.open("GET", e, !0),
              a.send(null),
              (i = !0),
              a
            );
          }
          "undefined" != typeof n &&
            (n.exports = r);
        },
        {},
      ],
      6: [
        function (e, n) {
          function r(e) {
            return !!e.match(/(Lat)(itude)?/gi);
          }
          function t(e) {
            return !!e.match(
              /(L)(on|ng)(gitude)?/i,
            );
          }
          function o(e) {
            return "object" == typeof e
              ? Object.keys(e).length
              : 0;
          }
          function i(e) {
            var n = [",", ";", "	", "|"],
              r = [];
            return (
              n.forEach(function (n) {
                var t = c(n).parse(e);
                if (t.length >= 1) {
                  for (
                    var i = o(t[0]), u = 0;
                    u < t.length;
                    u++
                  )
                    if (o(t[u]) !== i) return;
                  r.push({
                    delimiter: n,
                    arity: Object.keys(t[0])
                      .length,
                  });
                }
              }),
              r.length
                ? r.sort(function (e, n) {
                    return n.arity - e.arity;
                  })[0].delimiter
                : null
            );
          }
          function u(e) {
            var n = i(e);
            return n ? c(n).parse(e) : null;
          }
          function a(e, n, o) {
            o || ((o = n), (n = {})),
              (n.delimiter = n.delimiter || ",");
            var u = n.latfield || "",
              a = n.lonfield || "",
              s = [],
              f = {
                type: "FeatureCollection",
                features: s,
              };
            if (
              "auto" === n.delimiter &&
              "string" == typeof e &&
              ((n.delimiter = i(e)), !n.delimiter)
            )
              return o({
                type: "Error",
                message:
                  "Could not autodetect delimiter",
              });
            var p =
              "string" == typeof e
                ? c(n.delimiter).parse(e)
                : e;
            if (!p.length) return o(null, f);
            if (!u || !a) {
              for (var d in p[0])
                !u && r(d) && (u = d),
                  !a && t(d) && (a = d);
              if (!u || !a) {
                var g = [];
                for (var h in p[0]) g.push(h);
                return o({
                  type: "Error",
                  message:
                    "Latitude and longitude fields not present",
                  data: p,
                  fields: g,
                });
              }
            }
            for (
              var v = [], m = 0;
              m < p.length;
              m++
            )
              if (
                void 0 !== p[m][a] &&
                void 0 !== p[m][a]
              ) {
                var y,
                  w,
                  x,
                  L = p[m][a],
                  E = p[m][u];
                (x = l(L, "EW")),
                  x && (L = x),
                  (x = l(E, "NS")),
                  x && (E = x),
                  (y = parseFloat(L)),
                  (w = parseFloat(E)),
                  isNaN(y) || isNaN(w)
                    ? v.push({
                        message:
                          "A row contained an invalid value for latitude or longitude",
                        row: p[m],
                      })
                    : (n.includeLatLon ||
                        (delete p[m][a],
                        delete p[m][u]),
                      s.push({
                        type: "Feature",
                        properties: p[m],
                        geometry: {
                          type: "Point",
                          coordinates: [
                            parseFloat(y),
                            parseFloat(w),
                          ],
                        },
                      }));
              }
            o(v.length ? v : null, f);
          }
          function s(e) {
            for (
              var n = e.features,
                r = {
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: [],
                  },
                },
                t = 0;
              t < n.length;
              t++
            )
              r.geometry.coordinates.push(
                n[t].geometry.coordinates,
              );
            return (
              (r.properties = n[0].properties),
              {
                type: "FeatureCollection",
                features: [r],
              }
            );
          }
          function f(e) {
            for (
              var n = e.features,
                r = {
                  type: "Feature",
                  geometry: {
                    type: "Polygon",
                    coordinates: [[]],
                  },
                },
                t = 0;
              t < n.length;
              t++
            )
              r.geometry.coordinates[0].push(
                n[t].geometry.coordinates,
              );
            return (
              (r.properties = n[0].properties),
              {
                type: "FeatureCollection",
                features: [r],
              }
            );
          }
          var c = e("dsv"),
            l = e("sexagesimal");
          n.exports = {
            isLon: t,
            isLat: r,
            csv: c.csv.parse,
            tsv: c.tsv.parse,
            dsv: c,
            auto: u,
            csv2geojson: a,
            toLine: s,
            toPolygon: f,
          };
        },
        { dsv: 7, sexagesimal: 8 },
      ],
      7: [
        function (e, n) {
          e("fs");
          n.exports = new Function(
            'dsv.version = "0.0.3";\n\ndsv.tsv = dsv("\\t");\ndsv.csv = dsv(",");\n\nfunction dsv(delimiter) {\n  var dsv = {},\n      reFormat = new RegExp("[\\"" + delimiter + "\\n]"),\n      delimiterCode = delimiter.charCodeAt(0);\n\n  dsv.parse = function(text, f) {\n    var o;\n    return dsv.parseRows(text, function(row, i) {\n      if (o) return o(row, i - 1);\n      var a = new Function("d", "return {" + row.map(function(name, i) {\n        return JSON.stringify(name) + ": d[" + i + "]";\n      }).join(",") + "}");\n      o = f ? function(row, i) { return f(a(row), i); } : a;\n    });\n  };\n\n  dsv.parseRows = function(text, f) {\n    var EOL = {}, // sentinel value for end-of-line\n        EOF = {}, // sentinel value for end-of-file\n        rows = [], // output rows\n        N = text.length,\n        I = 0, // current character index\n        n = 0, // the current line number\n        t, // the current token\n        eol; // is the current token followed by EOL?\n\n    function token() {\n      if (I >= N) return EOF; // special case: end of file\n      if (eol) return eol = false, EOL; // special case: end of line\n\n      // special case: quotes\n      var j = I;\n      if (text.charCodeAt(j) === 34) {\n        var i = j;\n        while (i++ < N) {\n          if (text.charCodeAt(i) === 34) {\n            if (text.charCodeAt(i + 1) !== 34) break;\n            ++i;\n          }\n        }\n        I = i + 2;\n        var c = text.charCodeAt(i + 1);\n        if (c === 13) {\n          eol = true;\n          if (text.charCodeAt(i + 2) === 10) ++I;\n        } else if (c === 10) {\n          eol = true;\n        }\n        return text.substring(j + 1, i).replace(/""/g, "\\"");\n      }\n\n      // common case: find next delimiter or newline\n      while (I < N) {\n        var c = text.charCodeAt(I++), k = 1;\n        if (c === 10) eol = true; // \\n\n        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \\r|\\r\\n\n        else if (c !== delimiterCode) continue;\n        return text.substring(j, I - k);\n      }\n\n      // special case: last token before EOF\n      return text.substring(j);\n    }\n\n    while ((t = token()) !== EOF) {\n      var a = [];\n      while (t !== EOL && t !== EOF) {\n        a.push(t);\n        t = token();\n      }\n      if (f && !(a = f(a, n++))) continue;\n      rows.push(a);\n    }\n\n    return rows;\n  };\n\n  dsv.format = function(rows) {\n    if (Array.isArray(rows[0])) return dsv.formatRows(rows); // deprecated; use formatRows\n    var fieldSet = {}, fields = [];\n\n    // Compute unique fields in order of discovery.\n    rows.forEach(function(row) {\n      for (var field in row) {\n        if (!(field in fieldSet)) {\n          fields.push(fieldSet[field] = field);\n        }\n      }\n    });\n\n    return [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {\n      return fields.map(function(field) {\n        return formatValue(row[field]);\n      }).join(delimiter);\n    })).join("\\n");\n  };\n\n  dsv.formatRows = function(rows) {\n    return rows.map(formatRow).join("\\n");\n  };\n\n  function formatRow(row) {\n    return row.map(formatValue).join(delimiter);\n  }\n\n  function formatValue(text) {\n    return reFormat.test(text) ? "\\"" + text.replace(/\\"/g, "\\"\\"") + "\\"" : text;\n  }\n\n  return dsv;\n}\n;return dsv',
          )();
        },
        { fs: 2 },
      ],
      8: [
        function (e, n) {
          n.exports = function (e, n) {
            if (
              (n || (n = "NSEW"),
              "string" != typeof e)
            )
              return null;
            var r =
                /^([0-9.]+)°? *(?:([0-9.]+)['’′‘] *)?(?:([0-9.]+)(?:''|"|”|″) *)?([NSEW])?/,
              t = e.match(r);
            return t
              ? t[4] && -1 === n.indexOf(t[4])
                ? null
                : ((t[1] ? parseFloat(t[1]) : 0) +
                    (t[2]
                      ? parseFloat(t[2]) / 60
                      : 0) +
                    (t[3]
                      ? parseFloat(t[3]) / 3600
                      : 0)) *
                  ((t[4] && "S" === t[4]) ||
                  "W" === t[4]
                    ? -1
                    : 1)
              : null;
          };
        },
        {},
      ],
      9: [
        function (e, n) {
          function r(e, n) {
            (e = Math.round(e * n)),
              (e <<= 1),
              0 > e && (e = ~e);
            for (var r = ""; e >= 32; )
              (r += String.fromCharCode(
                (32 | (31 & e)) + 63,
              )),
                (e >>= 5);
            return (r += String.fromCharCode(
              e + 63,
            ));
          }
          var t = {};
          (t.decode = function (e, n) {
            for (
              var r,
                t,
                o = 0,
                i = 0,
                u = 0,
                a = [],
                s = 0,
                f = 0,
                c = null,
                l = Math.pow(10, n || 5);
              o < e.length;

            ) {
              (c = null), (s = 0), (f = 0);
              do
                (c = e.charCodeAt(o++) - 63),
                  (f |= (31 & c) << s),
                  (s += 5);
              while (c >= 32);
              (r = 1 & f ? ~(f >> 1) : f >> 1),
                (s = f = 0);
              do
                (c = e.charCodeAt(o++) - 63),
                  (f |= (31 & c) << s),
                  (s += 5);
              while (c >= 32);
              (t = 1 & f ? ~(f >> 1) : f >> 1),
                (i += r),
                (u += t),
                a.push([i / l, u / l]);
            }
            return a;
          }),
            (t.encode = function (e, n) {
              if (!e.length) return "";
              for (
                var t = Math.pow(10, n || 5),
                  o =
                    r(e[0][0], t) + r(e[0][1], t),
                  i = 1;
                i < e.length;
                i++
              ) {
                var u = e[i],
                  a = e[i - 1];
                (o += r(u[0] - a[0], t)),
                  (o += r(u[1] - a[1], t));
              }
              return o;
            }),
            void 0 !== typeof n &&
              (n.exports = t);
        },
        {},
      ],
      10: [
        function (e, n, r) {
          (function (t) {
            (toGeoJSON = (function () {
              "use strict";
              function n(e) {
                if (!e || !e.length) return 0;
                for (
                  var n = 0, r = 0;
                  n < e.length;
                  n++
                )
                  r =
                    ((r << 5) -
                      r +
                      e.charCodeAt(n)) |
                    0;
                return r;
              }
              function o(e, n) {
                return e.getElementsByTagName(n);
              }
              function i(e, n) {
                return e.getAttribute(n);
              }
              function u(e, n) {
                return parseFloat(i(e, n));
              }
              function a(e, n) {
                var r = o(e, n);
                return r.length ? r[0] : null;
              }
              function s(e) {
                return (
                  e.normalize && e.normalize(), e
                );
              }
              function f(e) {
                for (
                  var n = 0, r = [];
                  n < e.length;
                  n++
                )
                  r[n] = parseFloat(e[n]);
                return r;
              }
              function c(e) {
                var n = {};
                for (var r in e)
                  e[r] && (n[r] = e[r]);
                return n;
              }
              function l(e) {
                return (
                  e && s(e),
                  (e &&
                    e.firstChild &&
                    e.firstChild.nodeValue) ||
                    ""
                );
              }
              function p(e) {
                return f(
                  e.replace(y, "").split(","),
                );
              }
              function d(e) {
                for (
                  var n = e
                      .replace(w, "")
                      .split(x),
                    r = [],
                    t = 0;
                  t < n.length;
                  t++
                )
                  r.push(p(n[t]));
                return r;
              }
              function g(e) {
                var n = [
                    u(e, "lon"),
                    u(e, "lat"),
                  ],
                  r = a(e, "ele"),
                  t = a(e, "time");
                return (
                  r && n.push(parseFloat(l(r))),
                  {
                    coordinates: n,
                    time: t ? l(t) : null,
                  }
                );
              }
              function h() {
                return {
                  type: "FeatureCollection",
                  features: [],
                };
              }
              function v(e) {
                return void 0 !== e.xml
                  ? e.xml
                  : m.serializeToString(e);
              }
              var m,
                y = /\s*/g,
                w = /^\s*|\s*$/g,
                x = /\s+/;
              "undefined" != typeof XMLSerializer
                ? (m = new XMLSerializer())
                : "object" != typeof r ||
                  "object" != typeof t ||
                  t.browser ||
                  (m = new (e(
                    "xmldom",
                  ).XMLSerializer)());
              var L = {
                kml: function (e) {
                  function r(e) {
                    var n, r;
                    return (
                      (e = e || ""),
                      "#" === e.substr(0, 1) &&
                        (e = e.substr(1)),
                      (6 === e.length ||
                        3 === e.length) &&
                        (n = e),
                      8 === e.length &&
                        ((r =
                          parseInt(
                            e.substr(0, 2),
                            16,
                          ) / 255),
                        (n = e.substr(2))),
                      [n, isNaN(r) ? void 0 : r]
                    );
                  }
                  function t(e) {
                    return f(e.split(" "));
                  }
                  function u(e) {
                    var n = o(e, "coord", "gx"),
                      r = [],
                      i = [];
                    0 === n.length &&
                      (n = o(e, "gx:coord"));
                    for (
                      var u = 0;
                      u < n.length;
                      u++
                    )
                      r.push(t(l(n[u])));
                    for (
                      var a = o(e, "when"), u = 0;
                      u < a.length;
                      u++
                    )
                      i.push(l(a[u]));
                    return {
                      coords: r,
                      times: i,
                    };
                  }
                  function s(e) {
                    var n,
                      r,
                      t,
                      i,
                      f,
                      c = [],
                      g = [];
                    if (a(e, "MultiGeometry"))
                      return s(
                        a(e, "MultiGeometry"),
                      );
                    if (a(e, "MultiTrack"))
                      return s(
                        a(e, "MultiTrack"),
                      );
                    if (a(e, "gx:MultiTrack"))
                      return s(
                        a(e, "gx:MultiTrack"),
                      );
                    for (t = 0; t < y.length; t++)
                      if ((r = o(e, y[t])))
                        for (
                          i = 0;
                          i < r.length;
                          i++
                        )
                          if (
                            ((n = r[i]),
                            "Point" == y[t])
                          )
                            c.push({
                              type: "Point",
                              coordinates: p(
                                l(
                                  a(
                                    n,
                                    "coordinates",
                                  ),
                                ),
                              ),
                            });
                          else if (
                            "LineString" == y[t]
                          )
                            c.push({
                              type: "LineString",
                              coordinates: d(
                                l(
                                  a(
                                    n,
                                    "coordinates",
                                  ),
                                ),
                              ),
                            });
                          else if (
                            "Polygon" == y[t]
                          ) {
                            var h = o(
                                n,
                                "LinearRing",
                              ),
                              v = [];
                            for (
                              f = 0;
                              f < h.length;
                              f++
                            )
                              v.push(
                                d(
                                  l(
                                    a(
                                      h[f],
                                      "coordinates",
                                    ),
                                  ),
                                ),
                              );
                            c.push({
                              type: "Polygon",
                              coordinates: v,
                            });
                          } else if (
                            "Track" == y[t] ||
                            "gx:Track" == y[t]
                          ) {
                            var m = u(n);
                            c.push({
                              type: "LineString",
                              coordinates:
                                m.coords,
                            }),
                              m.times.length &&
                                g.push(m.times);
                          }
                    return {
                      geoms: c,
                      coordTimes: g,
                    };
                  }
                  function c(e) {
                    var n,
                      t = s(e),
                      u = {},
                      f = l(a(e, "name")),
                      c = l(a(e, "styleUrl")),
                      p = l(a(e, "description")),
                      d = a(e, "TimeSpan"),
                      g = a(e, "ExtendedData"),
                      h = a(e, "LineStyle"),
                      v = a(e, "PolyStyle");
                    if (!t.geoms.length)
                      return [];
                    if (
                      (f && (u.name = f),
                      c &&
                        m[c] &&
                        ((u.styleUrl = c),
                        (u.styleHash = m[c])),
                      p && (u.description = p),
                      d)
                    ) {
                      var y = l(a(d, "begin")),
                        w = l(a(d, "end"));
                      u.timespan = {
                        begin: y,
                        end: w,
                      };
                    }
                    if (h) {
                      var x = r(l(a(h, "color"))),
                        L = x[0],
                        E = x[1],
                        S = parseFloat(
                          l(a(h, "width")),
                        );
                      L && (u.stroke = L),
                        isNaN(E) ||
                          (u["stroke-opacity"] =
                            E),
                        isNaN(S) ||
                          (u["stroke-width"] = S);
                    }
                    if (v) {
                      var b = r(l(a(v, "color"))),
                        k = b[0],
                        M = b[1],
                        j = l(a(v, "fill")),
                        N = l(a(v, "outline"));
                      k && (u.fill = k),
                        isNaN(M) ||
                          (u["fill-opacity"] = M),
                        j &&
                          (u["fill-opacity"] =
                            "1" === j ? 1 : 0),
                        N &&
                          (u["stroke-opacity"] =
                            "1" === N ? 1 : 0);
                    }
                    if (g) {
                      var F = o(g, "Data"),
                        P = o(g, "SimpleData");
                      for (
                        n = 0;
                        n < F.length;
                        n++
                      )
                        u[
                          F[n].getAttribute(
                            "name",
                          )
                        ] = l(a(F[n], "value"));
                      for (
                        n = 0;
                        n < P.length;
                        n++
                      )
                        u[
                          P[n].getAttribute(
                            "name",
                          )
                        ] = l(P[n]);
                    }
                    t.coordTimes.length &&
                      (u.coordTimes =
                        1 === t.coordTimes.length
                          ? t.coordTimes[0]
                          : t.coordTimes);
                    var C = {
                      type: "Feature",
                      geometry:
                        1 === t.geoms.length
                          ? t.geoms[0]
                          : {
                              type: "GeometryCollection",
                              geometries: t.geoms,
                            },
                      properties: u,
                    };
                    return (
                      i(e, "id") &&
                        (C.id = i(e, "id")),
                      [C]
                    );
                  }
                  for (
                    var g = h(),
                      m = {},
                      y = [
                        "Polygon",
                        "LineString",
                        "Point",
                        "Track",
                        "gx:Track",
                      ],
                      w = o(e, "Placemark"),
                      x = o(e, "Style"),
                      L = 0;
                    L < x.length;
                    L++
                  )
                    m["#" + i(x[L], "id")] = n(
                      v(x[L]),
                    ).toString(16);
                  for (
                    var E = 0;
                    E < w.length;
                    E++
                  )
                    g.features =
                      g.features.concat(c(w[E]));
                  return g;
                },
                gpx: function (e) {
                  function n(e, n) {
                    var r = o(e, n),
                      t = [],
                      i = [],
                      u = r.length;
                    if (!(2 > u)) {
                      for (
                        var a = 0;
                        u > a;
                        a++
                      ) {
                        var s = g(r[a]);
                        t.push(s.coordinates),
                          s.time &&
                            i.push(s.time);
                      }
                      return {
                        line: t,
                        times: i,
                      };
                    }
                  }
                  function r(e) {
                    for (
                      var r,
                        t = o(e, "trkseg"),
                        i = [],
                        a = [],
                        s = 0;
                      s < t.length;
                      s++
                    )
                      (r = n(t[s], "trkpt")),
                        r.line && i.push(r.line),
                        r.times.length &&
                          a.push(r.times);
                    if (0 !== i.length) {
                      var f = u(e);
                      return (
                        a.length &&
                          (f.coordTimes =
                            1 === i.length
                              ? a[0]
                              : a),
                        {
                          type: "Feature",
                          properties: f,
                          geometry: {
                            type:
                              1 === i.length
                                ? "LineString"
                                : "MultiLineString",
                            coordinates:
                              1 === i.length
                                ? i[0]
                                : i,
                          },
                        }
                      );
                    }
                  }
                  function t(e) {
                    var r = n(e, "rtept");
                    if (r) {
                      var t = {
                        type: "Feature",
                        properties: u(e),
                        geometry: {
                          type: "LineString",
                          coordinates: r,
                        },
                      };
                      return (
                        r.times.length &&
                          (t.geometry.times =
                            r.times),
                        t
                      );
                    }
                  }
                  function i(e) {
                    var n = u(e);
                    return (
                      (n.sym = l(a(e, "sym"))),
                      {
                        type: "Feature",
                        properties: n,
                        geometry: {
                          type: "Point",
                          coordinates:
                            g(e).coordinates,
                        },
                      }
                    );
                  }
                  function u(e) {
                    var n,
                      r = [
                        "name",
                        "desc",
                        "author",
                        "copyright",
                        "link",
                        "time",
                        "keywords",
                      ],
                      t = {};
                    for (n = 0; n < r.length; n++)
                      t[r[n]] = l(a(e, r[n]));
                    return c(t);
                  }
                  var s,
                    f,
                    p = o(e, "trk"),
                    d = o(e, "rte"),
                    v = o(e, "wpt"),
                    m = h();
                  for (s = 0; s < p.length; s++)
                    (f = r(p[s])),
                      f && m.features.push(f);
                  for (s = 0; s < d.length; s++)
                    (f = t(d[s])),
                      f && m.features.push(f);
                  for (s = 0; s < v.length; s++)
                    m.features.push(i(v[s]));
                  return m;
                },
              };
              return L;
            })()),
              "undefined" != typeof n &&
                (n.exports = toGeoJSON);
          }.call(this, e("_process")));
        },
        { _process: 4, xmldom: 3 },
      ],
      11: [
        function (r, t) {
          !(function () {
            function r(e, n) {
              function r(n) {
                var r,
                  t = e.arcs[0 > n ? ~n : n],
                  o = t[0];
                return (
                  e.transform
                    ? ((r = [0, 0]),
                      t.forEach(function (e) {
                        (r[0] += e[0]),
                          (r[1] += e[1]);
                      }))
                    : (r = t[t.length - 1]),
                  0 > n ? [r, o] : [o, r]
                );
              }
              function t(e, n) {
                for (var r in e) {
                  var t = e[r];
                  delete n[t.start],
                    delete t.start,
                    delete t.end,
                    t.forEach(function (e) {
                      o[0 > e ? ~e : e] = 1;
                    }),
                    a.push(t);
                }
              }
              var o = {},
                i = {},
                u = {},
                a = [],
                s = -1;
              return (
                n.forEach(function (r, t) {
                  var o,
                    i = e.arcs[0 > r ? ~r : r];
                  i.length < 3 &&
                    !i[1][0] &&
                    !i[1][1] &&
                    ((o = n[++s]),
                    (n[s] = r),
                    (n[t] = o));
                }),
                n.forEach(function (e) {
                  var n,
                    t,
                    o = r(e),
                    a = o[0],
                    s = o[1];
                  if ((n = u[a]))
                    if (
                      (delete u[n.end],
                      n.push(e),
                      (n.end = s),
                      (t = i[s]))
                    ) {
                      delete i[t.start];
                      var f =
                        t === n ? n : n.concat(t);
                      i[(f.start = n.start)] = u[
                        (f.end = t.end)
                      ] = f;
                    } else
                      i[n.start] = u[n.end] = n;
                  else if ((n = i[s]))
                    if (
                      (delete i[n.start],
                      n.unshift(e),
                      (n.start = a),
                      (t = u[a]))
                    ) {
                      delete u[t.end];
                      var c =
                        t === n ? n : t.concat(n);
                      i[(c.start = t.start)] = u[
                        (c.end = n.end)
                      ] = c;
                    } else
                      i[n.start] = u[n.end] = n;
                  else
                    (n = [e]),
                      (i[(n.start = a)] = u[
                        (n.end = s)
                      ] =
                        n);
                }),
                t(u, i),
                t(i, u),
                n.forEach(function (e) {
                  o[0 > e ? ~e : e] ||
                    a.push([e]);
                }),
                a
              );
            }
            function o(e, n, t) {
              function o(e) {
                var n = 0 > e ? ~e : e;
                (c[n] || (c[n] = [])).push({
                  i: e,
                  g: f,
                });
              }
              function i(e) {
                e.forEach(o);
              }
              function u(e) {
                e.forEach(i);
              }
              function a(e) {
                "GeometryCollection" === e.type
                  ? e.geometries.forEach(a)
                  : e.type in l &&
                    ((f = e), l[e.type](e.arcs));
              }
              var s = [];
              if (arguments.length > 1) {
                var f,
                  c = [],
                  l = {
                    LineString: i,
                    MultiLineString: u,
                    Polygon: u,
                    MultiPolygon: function (e) {
                      e.forEach(u);
                    },
                  };
                a(n),
                  c.forEach(
                    arguments.length < 3
                      ? function (e) {
                          s.push(e[0].i);
                        }
                      : function (e) {
                          t(
                            e[0].g,
                            e[e.length - 1].g,
                          ) && s.push(e[0].i);
                        },
                  );
              } else
                for (
                  var p = 0, d = e.arcs.length;
                  d > p;
                  ++p
                )
                  s.push(p);
              return {
                type: "MultiLineString",
                arcs: r(e, s),
              };
            }
            function i(e, t) {
              function o(e) {
                e.forEach(function (n) {
                  n.forEach(function (n) {
                    (
                      u[(n = 0 > n ? ~n : n)] ||
                      (u[n] = [])
                    ).push(e);
                  });
                }),
                  a.push(e);
              }
              function i(n) {
                return (
                  d(
                    s(e, {
                      type: "Polygon",
                      arcs: [n],
                    }).coordinates[0],
                  ) > 0
                );
              }
              var u = {},
                a = [],
                f = [];
              return (
                t.forEach(function (e) {
                  "Polygon" === e.type
                    ? o(e.arcs)
                    : "MultiPolygon" === e.type &&
                      e.arcs.forEach(o);
                }),
                a.forEach(function (e) {
                  if (!e._) {
                    var n = [],
                      r = [e];
                    for (
                      e._ = 1, f.push(n);
                      (e = r.pop());

                    )
                      n.push(e),
                        e.forEach(function (e) {
                          e.forEach(function (e) {
                            u[
                              0 > e ? ~e : e
                            ].forEach(function (
                              e,
                            ) {
                              e._ ||
                                ((e._ = 1),
                                r.push(e));
                            });
                          });
                        });
                  }
                }),
                a.forEach(function (e) {
                  delete e._;
                }),
                {
                  type: "MultiPolygon",
                  arcs: f.map(function (t) {
                    var o = [];
                    if (
                      (t.forEach(function (e) {
                        e.forEach(function (e) {
                          e.forEach(function (e) {
                            u[0 > e ? ~e : e]
                              .length < 2 &&
                              o.push(e);
                          });
                        });
                      }),
                      (o = r(e, o)),
                      (n = o.length) > 1)
                    )
                      for (
                        var a,
                          s = i(t[0][0]),
                          f = 0;
                        f < n;
                        ++f
                      )
                        if (s === i(o[f])) {
                          (a = o[0]),
                            (o[0] = o[f]),
                            (o[f] = a);
                          break;
                        }
                    return o;
                  }),
                }
              );
            }
            function u(e, n) {
              return "GeometryCollection" ===
                n.type
                ? {
                    type: "FeatureCollection",
                    features: n.geometries.map(
                      function (n) {
                        return a(e, n);
                      },
                    ),
                  }
                : a(e, n);
            }
            function a(e, n) {
              var r = {
                type: "Feature",
                id: n.id,
                properties: n.properties || {},
                geometry: s(e, n),
              };
              return (
                null == n.id && delete r.id, r
              );
            }
            function s(e, n) {
              function r(e, n) {
                n.length && n.pop();
                for (
                  var r,
                    t = c[0 > e ? ~e : e],
                    o = 0,
                    i = t.length;
                  i > o;
                  ++o
                )
                  n.push((r = t[o].slice())),
                    s(r, o);
                0 > e && f(n, i);
              }
              function t(e) {
                return (
                  (e = e.slice()), s(e, 0), e
                );
              }
              function o(e) {
                for (
                  var n = [], t = 0, o = e.length;
                  o > t;
                  ++t
                )
                  r(e[t], n);
                return (
                  n.length < 2 &&
                    n.push(n[0].slice()),
                  n
                );
              }
              function i(e) {
                for (var n = o(e); n.length < 4; )
                  n.push(n[0].slice());
                return n;
              }
              function u(e) {
                return e.map(i);
              }
              function a(e) {
                var n = e.type;
                return "GeometryCollection" === n
                  ? {
                      type: n,
                      geometries:
                        e.geometries.map(a),
                    }
                  : n in l
                  ? {
                      type: n,
                      coordinates: l[n](e),
                    }
                  : null;
              }
              var s = m(e.transform),
                c = e.arcs,
                l = {
                  Point: function (e) {
                    return t(e.coordinates);
                  },
                  MultiPoint: function (e) {
                    return e.coordinates.map(t);
                  },
                  LineString: function (e) {
                    return o(e.arcs);
                  },
                  MultiLineString: function (e) {
                    return e.arcs.map(o);
                  },
                  Polygon: function (e) {
                    return u(e.arcs);
                  },
                  MultiPolygon: function (e) {
                    return e.arcs.map(u);
                  },
                };
              return a(n);
            }
            function f(e, n) {
              for (
                var r, t = e.length, o = t - n;
                o < --t;

              )
                (r = e[o]),
                  (e[o++] = e[t]),
                  (e[t] = r);
            }
            function c(e, n) {
              for (
                var r = 0, t = e.length;
                t > r;

              ) {
                var o = (r + t) >>> 1;
                e[o] < n ? (r = o + 1) : (t = o);
              }
              return r;
            }
            function l(e) {
              function n(e, n) {
                e.forEach(function (e) {
                  0 > e && (e = ~e);
                  var r = o[e];
                  r ? r.push(n) : (o[e] = [n]);
                });
              }
              function r(e, r) {
                e.forEach(function (e) {
                  n(e, r);
                });
              }
              function t(e, n) {
                "GeometryCollection" === e.type
                  ? e.geometries.forEach(
                      function (e) {
                        t(e, n);
                      },
                    )
                  : e.type in u &&
                    u[e.type](e.arcs, n);
              }
              var o = {},
                i = e.map(function () {
                  return [];
                }),
                u = {
                  LineString: n,
                  MultiLineString: r,
                  Polygon: r,
                  MultiPolygon: function (e, n) {
                    e.forEach(function (e) {
                      r(e, n);
                    });
                  },
                };
              e.forEach(t);
              for (var a in o)
                for (
                  var s = o[a],
                    f = s.length,
                    l = 0;
                  f > l;
                  ++l
                )
                  for (
                    var p = l + 1;
                    f > p;
                    ++p
                  ) {
                    var d,
                      g = s[l],
                      h = s[p];
                    (d = i[g])[(a = c(d, h))] !==
                      h && d.splice(a, 0, h),
                      (d = i[h])[
                        (a = c(d, g))
                      ] !== g &&
                        d.splice(a, 0, g);
                  }
              return i;
            }
            function p(e, n) {
              function r(e) {
                u.remove(e),
                  (e[1][2] = n(e)),
                  u.push(e);
              }
              var t,
                o = m(e.transform),
                i = y(e.transform),
                u = v(),
                a = 0;
              for (
                n || (n = g),
                  e.arcs.forEach(function (e) {
                    var r = [];
                    e.forEach(o);
                    for (
                      var i = 1, a = e.length - 1;
                      a > i;
                      ++i
                    )
                      (t = e.slice(i - 1, i + 2)),
                        (t[1][2] = n(t)),
                        r.push(t),
                        u.push(t);
                    e[0][2] = e[a][2] = 1 / 0;
                    for (
                      var i = 0, a = r.length;
                      a > i;
                      ++i
                    )
                      (t = r[i]),
                        (t.previous = r[i - 1]),
                        (t.next = r[i + 1]);
                  });
                (t = u.pop());

              ) {
                var s = t.previous,
                  f = t.next;
                t[1][2] < a
                  ? (t[1][2] = a)
                  : (a = t[1][2]),
                  s &&
                    ((s.next = f),
                    (s[2] = t[2]),
                    r(s)),
                  f &&
                    ((f.previous = s),
                    (f[0] = t[0]),
                    r(f));
              }
              return (
                e.arcs.forEach(function (e) {
                  e.forEach(i);
                }),
                e
              );
            }
            function d(e) {
              for (
                var n,
                  r = -1,
                  t = e.length,
                  o = e[t - 1],
                  i = 0;
                ++r < t;

              )
                (n = o),
                  (o = e[r]),
                  (i +=
                    n[0] * o[1] - n[1] * o[0]);
              return 0.5 * i;
            }
            function g(e) {
              var n = e[0],
                r = e[1],
                t = e[2];
              return Math.abs(
                (n[0] - t[0]) * (r[1] - n[1]) -
                  (n[0] - r[0]) * (t[1] - n[1]),
              );
            }
            function h(e, n) {
              return e[1][2] - n[1][2];
            }
            function v() {
              function e(e, n) {
                for (; n > 0; ) {
                  var r = ((n + 1) >> 1) - 1,
                    o = t[r];
                  if (h(e, o) >= 0) break;
                  (t[(o._ = n)] = o),
                    (t[(e._ = n = r)] = e);
                }
              }
              function n(e, n) {
                for (;;) {
                  var r = (n + 1) << 1,
                    i = r - 1,
                    u = n,
                    a = t[u];
                  if (
                    (o > i &&
                      h(t[i], a) < 0 &&
                      (a = t[(u = i)]),
                    o > r &&
                      h(t[r], a) < 0 &&
                      (a = t[(u = r)]),
                    u === n)
                  )
                    break;
                  (t[(a._ = n)] = a),
                    (t[(e._ = n = u)] = e);
                }
              }
              var r = {},
                t = [],
                o = 0;
              return (
                (r.push = function (n) {
                  return (
                    e((t[(n._ = o)] = n), o++), o
                  );
                }),
                (r.pop = function () {
                  if (!(0 >= o)) {
                    var e,
                      r = t[0];
                    return (
                      --o > 0 &&
                        ((e = t[o]),
                        n((t[(e._ = 0)] = e), 0)),
                      r
                    );
                  }
                }),
                (r.remove = function (r) {
                  var i,
                    u = r._;
                  if (t[u] === r)
                    return (
                      u !== --o &&
                        ((i = t[o]),
                        (h(i, r) < 0 ? e : n)(
                          (t[(i._ = u)] = i),
                          u,
                        )),
                      u
                    );
                }),
                r
              );
            }
            function m(e) {
              if (!e) return w;
              var n,
                r,
                t = e.scale[0],
                o = e.scale[1],
                i = e.translate[0],
                u = e.translate[1];
              return function (e, a) {
                a || (n = r = 0),
                  (e[0] = (n += e[0]) * t + i),
                  (e[1] = (r += e[1]) * o + u);
              };
            }
            function y(e) {
              if (!e) return w;
              var n,
                r,
                t = e.scale[0],
                o = e.scale[1],
                i = e.translate[0],
                u = e.translate[1];
              return function (e, a) {
                a || (n = r = 0);
                var s = ((e[0] - i) / t) | 0,
                  f = ((e[1] - u) / o) | 0;
                (e[0] = s - n),
                  (e[1] = f - r),
                  (n = s),
                  (r = f);
              };
            }
            function w() {}
            var x = {
              version: "1.6.8",
              mesh: function (e) {
                return s(
                  e,
                  o.apply(this, arguments),
                );
              },
              meshArcs: o,
              merge: function (e) {
                return s(
                  e,
                  i.apply(this, arguments),
                );
              },
              mergeArcs: i,
              feature: u,
              neighbors: l,
              presimplify: p,
            };
            "function" == typeof e && e.amd
              ? e(x)
              : "object" == typeof t && t.exports
              ? (t.exports = x)
              : (this.topojson = x);
          })();
        },
        {},
      ],
      12: [
        function (e, n) {
          function r(e) {
            function n(n) {
              var r = e.substring(m).match(n);
              return r
                ? ((m += r[0].length), r[0])
                : null;
            }
            function r(e) {
              return (
                e &&
                  v.match(/\d+/) &&
                  (e.crs = {
                    type: "name",
                    properties: {
                      name:
                        "urn:ogc:def:crs:EPSG::" +
                        v,
                    },
                  }),
                e
              );
            }
            function t() {
              n(/^\s*/);
            }
            function i() {
              t();
              for (
                var e,
                  r = 0,
                  i = [],
                  u = [i],
                  a = i;
                (e =
                  n(/^(\()/) ||
                  n(/^(\))/) ||
                  n(/^(\,)/) ||
                  n(o));

              ) {
                if ("(" == e)
                  u.push(a),
                    (a = []),
                    u[u.length - 1].push(a),
                    r++;
                else if (")" == e) {
                  if (((a = u.pop()), !a)) return;
                  if ((r--, 0 === r)) break;
                } else if ("," === e)
                  (a = []),
                    u[u.length - 1].push(a);
                else {
                  if (isNaN(parseFloat(e)))
                    return null;
                  a.push(parseFloat(e));
                }
                t();
              }
              return 0 !== r ? null : i;
            }
            function u() {
              for (
                var e, r, i = [];
                (r = n(o) || n(/^(\,)/));

              )
                "," == r
                  ? (i.push(e), (e = []))
                  : (e || (e = []),
                    e.push(parseFloat(r))),
                  t();
              return (
                e && i.push(e),
                i.length ? i : null
              );
            }
            function a() {
              if (!n(/^(point)/i)) return null;
              if ((t(), !n(/^(\()/))) return null;
              var e = u();
              return e
                ? (t(),
                  n(/^(\))/)
                    ? {
                        type: "Point",
                        coordinates: e[0],
                      }
                    : null)
                : null;
            }
            function s() {
              if (!n(/^(multipoint)/i))
                return null;
              t();
              var e = i();
              return e
                ? (t(),
                  {
                    type: "MultiPoint",
                    coordinates: e,
                  })
                : null;
            }
            function f() {
              if (!n(/^(multilinestring)/i))
                return null;
              t();
              var e = i();
              return e
                ? (t(),
                  {
                    type: "MultiLineString",
                    coordinates: e,
                  })
                : null;
            }
            function c() {
              if (!n(/^(linestring)/i))
                return null;
              if ((t(), !n(/^(\()/))) return null;
              var e = u();
              return e && n(/^(\))/)
                ? {
                    type: "LineString",
                    coordinates: e,
                  }
                : null;
            }
            function l() {
              return n(/^(polygon)/i)
                ? (t(),
                  {
                    type: "Polygon",
                    coordinates: i(),
                  })
                : null;
            }
            function p() {
              return n(/^(multipolygon)/i)
                ? (t(),
                  {
                    type: "MultiPolygon",
                    coordinates: i(),
                  })
                : null;
            }
            function d() {
              var e,
                r = [];
              if (!n(/^(geometrycollection)/i))
                return null;
              if ((t(), !n(/^(\()/))) return null;
              for (; (e = g()); )
                r.push(e), t(), n(/^(\,)/), t();
              return n(/^(\))/)
                ? {
                    type: "GeometryCollection",
                    geometries: r,
                  }
                : null;
            }
            function g() {
              return (
                a() ||
                c() ||
                l() ||
                s() ||
                f() ||
                p() ||
                d()
              );
            }
            var h = e.split(";"),
              e = h.pop(),
              v = (h.shift() || "")
                .split("=")
                .pop(),
              m = 0;
            return r(g());
          }
          function t(e) {
            function n(e) {
              return 2 === e.length
                ? e[0] + " " + e[1]
                : 3 === e.length
                ? e[0] + " " + e[1] + " " + e[2]
                : void 0;
            }
            function r(e) {
              return e.map(n).join(", ");
            }
            function o(e) {
              return e.map(r).map(u).join(", ");
            }
            function i(e) {
              return e.map(o).map(u).join(", ");
            }
            function u(e) {
              return "(" + e + ")";
            }
            switch (
              ("Feature" === e.type &&
                (e = e.geometry),
              e.type)
            ) {
              case "Point":
                return (
                  "POINT (" +
                  n(e.coordinates) +
                  ")"
                );
              case "LineString":
                return (
                  "LINESTRING (" +
                  r(e.coordinates) +
                  ")"
                );
              case "Polygon":
                return (
                  "POLYGON (" +
                  o(e.coordinates) +
                  ")"
                );
              case "MultiPoint":
                return (
                  "MULTIPOINT (" +
                  r(e.coordinates) +
                  ")"
                );
              case "MultiPolygon":
                return (
                  "MULTIPOLYGON (" +
                  i(e.coordinates) +
                  ")"
                );
              case "MultiLineString":
                return (
                  "MULTILINESTRING (" +
                  o(e.coordinates) +
                  ")"
                );
              case "GeometryCollection":
                return (
                  "GEOMETRYCOLLECTION (" +
                  e.geometries.map(t).join(", ") +
                  ")"
                );
              default:
                throw new Error(
                  "stringify requires a valid GeoJSON Feature or geometry object as input",
                );
            }
          }
          (n.exports = r),
            (n.exports.parse = r),
            (n.exports.stringify = t);
          var o =
            /^[-+]?([0-9]*\.[0-9]+|[0-9]+)([eE][-+]?[0-9]+)?/;
        },
        {},
      ],
    },
    {},
    [1],
  )(1);
});
