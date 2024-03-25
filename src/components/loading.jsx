import React from 'react';

function Loading({isLoading}) {
  return (
    <div className='loading-container'>
     <i class="fa fa-circle-o-notch fa-spin"></i>
     {/* <div class="center">
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
</div> */}
    </div>
    
  );
}

export default Loading;