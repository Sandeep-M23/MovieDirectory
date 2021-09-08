import React from 'react';
import Styles from './SearchBar.module.css';
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = (props) => (
    <div className={Styles.Search}>
        <input type="text" name="searchBar" placeholder="Search" onChange={props.changed} value={props.name}/>
        <SearchIcon className={Styles.SearchIcon}/>
    </div>
) 

export default SearchBar;