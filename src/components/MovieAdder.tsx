import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';

class MovieAdder extends Component<{email: string}> {
    promiseOptions(inputValue: string) {
        const searchParams = new URLSearchParams({search: inputValue});
        return fetch('/search-movies?' + searchParams.toString())
               .then((response) => response.json())
               .then(function(json: {searchResults: Array<{imdb_id: string, title: string}>}) {
                   console.log('here?')
                   console.log(json)
                   console.log(json.searchResults.map((option) => ({label: option.title, value: option.imdb_id})))
                   return json.searchResults.map((option) => ({label: option.title, value: option.imdb_id}))
               });
    }

    render() {
        return <AsyncSelect loadOptions={this.promiseOptions} />
    }
}

export default MovieAdder;
