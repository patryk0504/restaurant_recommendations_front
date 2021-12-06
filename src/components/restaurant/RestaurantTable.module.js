import styled from 'styled-components';


export const Styles = styled.div`

    background-color: white;
    padding-top: 2rem;
.react-minimal-datetime-range{
    width: 415px;
    // height: 300px;
}
  .react-minimal-datetime-range-calendar__table-cel.no-border {
  
  width: 40px;
  }
  .react-minimal-datetime-range-calendar__table-cel.react-minimal-datetime-range-calendar__date-item{
  width: 40px;
  }
  margin-top: 5rem;
  // padding: 1rem;
  ${'' /* These styles are suggested for the table fill all available space in its containing element */}
  // display: block;
  ${'' /* These styles are required for a horizontaly scrollable table overflow */}
  // overflow: auto;

/* !!!!This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    width: 100%;
    // height: 100%;
    position: relative;
    /*position: absolute;*/
    max-width: 100%;
    // overflow-x: hidden;
    // overflow-x: scroll;

    overflow-y: hidden;
    /*border-bottom: 1px solid black;*/
  }

  .table {
  
    
    width: 100%;
    border-spacing: 0;
    /*border: 1px solid black;*/
    // overflow-x: scroll;

    .thead {
      ${'' /* These styles are required for a scrollable body to align with the header properly */}
        overflow-y: scroll;
      overflow-x: scroll;
      .tr{
            border-bottom: 1px solid grey;
      }
      .tr:nth-child(1){
            font-weight: bold;
      }
    }

    .tbody {
      ${'' /* These styles are required for a scrollable table body */}
      overflow-y: scroll;
      /*overflow-x: scroll;*/
      overflow-x: scroll;
      // position: absolute;
      height: 350px;
      
      .tr:nth-child(2n){
        background: lightgrey;
      }
     
     .tr:hover{
        cursor: pointer;
        background-color: #3e434a;
        color: white;
        // filter: brightness(85%);
     }
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
          word-break: break-all;
        }
      }
      // border-bottom: 1px solid grey;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-right: 1px solid grey;
      word-break: break-all;
      text-align: center;
      
      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;
      
      /* !!!!!The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }


      :last-child {
        border-right: 0;
      }

      .resizer {
        right: 0;
        background: grey;
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`