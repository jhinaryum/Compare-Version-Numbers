function versionCompare(v1, v2, options) {
  var lexicographical = (options && options.lexicographical) || false,
      zeroExtend = (options && options.zeroExtend) || true,
      v1parts = (v1 || "0").split('.'),
      v2parts = (v2 || "0").split('.');

  function isValidPart(x) {
    return (lexicographical ? /^\d+[A-Za-zαß]*$/ : /^\d+[A-Za-zαß]?$/).test(x);
  }

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }
// durumların neler olduğu yazılarak kurala istinaden sonuç değerini vermesi sağlanıyor
  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push("0");
    while (v2parts.length < v1parts.length) v2parts.push("0");
  }

  if (!lexicographical) {
    v1parts = v1parts.map(function(x){
     var match = (/[A-Za-zαß]/).exec(x);  
     return Number(match ? x.replace(match[0], "." + x.charCodeAt(match.index)):x);
    });
    v2parts = v2parts.map(function(x){
     var match = (/[A-Za-zαß]/).exec(x);  
     return Number(match ? x.replace(match[0], "." + x.charCodeAt(match.index)):x);
    });
  }
// bu kısımda döngüye sokarak girilen değerleri değerlendirip sonucu çıkartıyor
  for (var i = 0; i < v1parts.length; ++i) {
    if (v2parts.length == i) {
      return 1;
    }

    if (v1parts[i] == v2parts[i]) {
      continue;
    }
    else if (v1parts[i] > v2parts[i]) {
      return 1;
    }
    else {
      return -1;
    }
  }

  if (v1parts.length != v2parts.length) {
    return -1;
  }

  return 0;
}