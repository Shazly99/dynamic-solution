import React, { useContext } from 'react'
import Localization from './Localization.js'
import { Table } from 'react-bootstrap'
import { VendersContext } from '../../context/Store.js';

const DataView = ({ data }) => {
  let { isLang } = useContext(VendersContext);
  return (
    <>
      <Table responsive={true} id='my-table' className='rounded-3 '>
        <thead>
          <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
            {
              Localization[isLang]?.TableHeader?.map((item, index) => (
                <th key={index}>{item}</th>
              ))
            }
          </tr>
        </thead>
        <tbody className='text-center'>
          {

            data?.map((item, index) => (
              <tr key={index}>

                <td >
                  <div>
                    {item?.first_name}
                  </div>
                </td>

                <td >
                  <div>
                    {item?.last_name}
                  </div>
                </td>

                <td >
                  <div>
                    {item?.email}
                  </div>
                </td>

                <td >
                  <div>
                    {item?.phone}
                  </div>
                </td>

              </tr>
            ))
          }



        </tbody>

      </Table>
    </>
  )
}

export default DataView
