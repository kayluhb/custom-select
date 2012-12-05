# Custom Select
A simple plugin for creating custom select drop downs.

Call the plugin with

    $('jquery-selector').customSelect();

The first class is what the plugin uses to style the select. If the element does not have any class, it will default to 'custom-select'.

There are no parameters for this plugin at this time

## Example

    <select class="custom-select">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>

    <script>
        (function($){
            function init(){
                $('.custom-select').customSelect();
            }
            $(init);
        }(jQuery));
    </script>