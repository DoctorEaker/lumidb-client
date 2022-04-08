import { BaseCommand, flags } from '@adonisjs/core/build/standalone'
import axios from 'axios'


export default class Insert extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'insert'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  @flags.boolean()
  public debug: boolean = false

  @flags.string()
  public key: string

  @flags.string()
  public value: string

  public async run() {
    let key = this.key
    let value = this.value

    if (key == null){
      this.logger.error(new Error('Key is missing, please set key with --key=<key>'))
    }

    if (value == null){
      this.logger.error(new Error('Value is missing please set value with --value=<value>'))
    }

    let url = 'http://ec2-44-226-128-235.us-west-2.compute.amazonaws.com:8080/'+key+'/'
    let result = {}
    await axios.post(url, {
      value:value
    }).then(response => {
      response.data.response[key] = Object.assign({}, response.data.response[key])
      if(this.debug == true){
        result = response.data
      } else {
        result = response.data.response
      }
    })

    console.log(result)
  }
}
