// @flow

const fs = require('fs-extra')
const path = require('path')
const React = require('react')

/*::
type AssetPropsType = {
    path: string,
    async?: boolean,
    inline?: boolean,
    media: 'screen' | 'print',
}
*/

function _render (props/*: AssetPropsType */) {
    var _dest_path, _ext, _source_path, full_path, output;
    full_path = "" + global.ASSET_URL + props.path;
    _source_path = path.join(global.build_info.asset_cache_directory, props.path);
    _ext = props.path.split('.').pop();
    switch (_ext) {
      case 'js':
      case 'coffee':
      case 'cjsx':
      case 'jsx':
        if (_ext === 'coffee' || _ext === 'cjsx' || _ext === 'jsx') {
          full_path = full_path.replace("." + _ext, '.js');
          _source_path = _source_path.replace("." + _ext, '.js');
        }
        output = React.createElement("script", {
          "src": full_path,
          "async": props.async
        });
        break;
      case 'css':
      case 'sass':
      case 'scss':
        if (_ext === 'sass') {
          full_path = full_path.replace('.sass', '.css');
          _source_path = _source_path.replace('.sass', '.css');
        } else if (_ext === 'scss') {
          full_path = full_path.replace('.scss', '.css');
          _source_path = _source_path.replace('.scss', '.css');
        }
        output = React.createElement("link", {
          "rel": 'stylesheet',
          "type": 'text/css',
          "href": full_path,
          "media": props.media
        });
        break;
      default:
        console.warn("Asset got unknown asset type (" + _ext + ")");
        return null;
    }
    _dest_path = _source_path.replace(global.build_info.asset_cache_directory, global.build_info.asset_dest_directory);
    if (!fs.existsSync(_dest_path)) {
      fs.copySync(_source_path, _dest_path);
    }
    return output;
};


function _renderInline (props/*: AssetPropsType */) {
  var _ext, _path, file_content;
  _path = path.join(global.build_info.asset_cache_directory, props.path);
  _ext = _path.split('.').pop();
  switch (_ext) {
    case 'js':
    case 'coffee':
    case 'cjsx':
    case 'jsx':
      if (_ext === 'coffee' || _ext === 'cjsx' || _ext === 'jsx') {
        _path = _path.replace("." + _ext, '.js');
      }
      file_content = fs.readFileSync(_path).toString();
      return React.createElement("script", {
        "dangerouslySetInnerHTML": {
          __html: file_content
        }
      });
    case 'css':
    case 'sass':
    case 'scss':
      if (_ext === 'sass' || _ext === 'scss') {
        _path = _path.replace("." + _ext, '.css');
      }
      file_content = fs.readFileSync(_path).toString();
      return React.createElement("style", {
        "dangerouslySetInnerHTML": {
          __html: file_content
        }
      });
    default:
      console.warn("Asset got unknown asset type (" + _ext + ")");
      return null;
  }
};

const Asset = (props/*: AssetPropsType */) => {
    if (props.inline) {
        return _renderInline(props)
    }
    return _render(props)
}


Asset.defaultProps = {
    media: 'screen',
}

module.exports = Asset