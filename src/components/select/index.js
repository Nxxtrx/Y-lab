import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {

  function sortByParent(arr, parent = null, result = [], level = 0) {
    const children = arr.filter(item => (item.parent && item.parent._id === parent) || (item.parent === null && parent === null));
    for (const child of children) {
      child.title = '-'.repeat(level) + ' ' + child.title;
      result.push(child);
      sortByParent(arr, child._id, result, level + 1);
    }
    return result;
  }

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.options.map(item => (
        <option key={item.value || item._id} value={item._id || item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

Select.defaultProps = {
  onChange: () => {
  }
}

export default memo(Select);
