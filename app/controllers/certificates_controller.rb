class CertificatesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_certificate, only: %i[show edit update destroy]
  before_action :check_certificate_exists, only: %i[new create]

  # GET /certificates
  def index
    @certificates = Certificate.all
  end

  # GET /certificates/1
  def show
  end

  # GET /certificates/new
  def new
    @certificate = Certificate.new
  end

  # POST /certificates
  def create
    @certificate = Certificate.new(certificate_params)
    @certificate.user = current_user # Associate the certificate with the current user
    if @certificate.save
      redirect_to @certificate, notice: 'Certificate was successfully created.'
    else
      render :new
    end
  end

  # GET /certificates/1/edit
  def edit
  end

  # PATCH/PUT /certificates/1
  def update
    if @certificate.update(certificate_params)
      redirect_to @certificate, notice: 'Certificate was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /certificates/1
  def destroy
    @certificate.destroy
    redirect_to certificates_url, notice: 'Certificate was successfully destroyed.'
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_certificate
    @certificate = Certificate.find(params[:id])
  end

  # Check if the current user already has a certificate
  def check_certificate_exists
    if Certificate.exists?(user_id: current_user.id)
      redirect_to root_path, alert: 'You can only create one certificate.'
    end
  end

  # Only allow a list of trusted parameters through.
  def certificate_params
    params.require(:certificate).permit(:child_name, :father_name, :mother_name, :Dob, :time, :gender, :place_of_birth)
  end
end
