class SettingsController < ApplicationController
  before_action :authenticate_admin!

  def edit
    puts current_admin
    render "edit.html.erb"
  end

  def update
    @autotext = params[:autotext]
    unless @autotext == ""
      @admin_setting = Setting.find_by(admin_id: current_admin.id)

      if @admin_setting
        @admin_setting.auto_text = @autotext
        @admin_setting.save
        flash[:success] = "Settings Saved!"
        redirect_to :root
      else
        @admin_setting = Setting.new(admin_id: current_admin.id, auto_text: @autotext)
        @admin_setting.save
        flash[:success] = "Settings Saved!"
        redirect_to :root
      end
    end
  end
end
