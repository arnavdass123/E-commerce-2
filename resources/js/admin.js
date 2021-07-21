import axios from "axios";
import moment from "moment";

export function initAdmin() {
    // init admin code is herwer:

    const orderTableBody = document.querySelector("#orderTableBody");
    console.log(orderTableBody);
    let orders = []
    let markup;

    axios.get("/admin/orders", {
            headers: {
                "X-Requested-with": "XMLHttpRequest"
            }
        }).then((res) => {
            console.log(res.data)
            orders = res.data
            markup = generateMarkup(orders);
            orderTableBody.innerHTML = markup;
        })
        .catch((err) => {
            console.log(err);
        });

    //  rendring items:
    function renderItems(items) {
        let parsedItems = Object.values(items);
        console.log("PARS:", parsedItems);
        return parsedItems
            .map((menuItem) => {
                return `
      <p>${menuItem.items.name} - ${menuItem.qty} pcs</p>
    `;
            })
            .join("");
    }

    function generateMarkup(orders) {
        //   call map

        return orders.map((order) => {
                return `
      <tr>
      <td class="border px-4 py-2 text-green-900">
          <p>${order._id}</p>
          <div>${renderItems(order.items)}</div>
      </td>
      <td class="border px-4 py-2">${order.customerId.name}</td>
      <td class="border px-4 py-2">${order.address}</td>
      <td class="border px-4 py-2">
          <div class="inline-block relative w-64">
              <form action="/admin/order/status" method="POST">
                  <input type="hidden" name="orderId" value="${order._id}">
                  <select name="status" onchange="this.form.submit()" class="block appearance-none w-full bg-white border 
                  border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded
                  shadow leading-tight focus:outline-none focus:shadow-outline">

                      <option value="order_placed" ${
                        order.status === "order_placed" ? "selected" : ""
                      }>
                          placed
                      </option>

                      <option value="confirmed" ${
                        order.status === "confirmed" ? "selected" : ""
                      }>
                          confirmed
                      </option>

                      <option value="prepared" ${
                        order.status === "prepared" ? "selecte" : ""
                      }>
                          prepared
                      </option>

                      <option value="delivered" ${
                        order.status === "delivered" ? "selected" : ""
                      }>
                          delivered
                      </option>

                      <option value="completed" ${
                        order.status === "completed" ? "selected" : ""
                      }>
                          completed
                      </option>
                  </select>
              </form>
          </div>
      </td>
      <td class="border px-4 py-2">
          ${moment(order.createdAt).format("hh:mm A")}
      </td>
  </tr>
      `;
            })
            .join("");
    }
}